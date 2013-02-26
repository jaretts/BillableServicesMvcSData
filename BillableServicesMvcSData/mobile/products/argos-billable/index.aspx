﻿<%@ Page AutoEventWireup="true" Language="c#" Culture="auto" UICulture="auto" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Text.RegularExpressions" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<!DOCTYPE html>
<html manifest="index.manifest.ashx">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no,email=no,address=no" />

    <title>Billable Services</title>

    <link rel="apple-touch-icon-precomposed" href="content/images/AppIcon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="content/images/AppIcon-114x114.png" />

    <link rel="apple-touch-startup-image" href="content/images/loading.png" />

    <!-- CSS -->
    <link type="text/css" rel="stylesheet" href="content/platform/css/layout.css" />
    <link type="text/css" rel="stylesheet" href="content/platform/css/theme.css" />
    <link type="text/css" rel="stylesheet" href="content/css/theme.css" />
    <link type="text/css" rel="stylesheet" href="content/css/app.css" />

    <!-- Dojo -->
    <script type="text/javascript" src="content/dojo/dojo/dojo.js" data-dojo-config="parseOnLoad:false, async:true, blankGif:'content/images/blank.gif'"></script>
    <script type="text/javascript">
    require({
        baseUrl: "./",
        packages: [
            { name: 'dojo', location: 'content/dojo/dojo' },
            { name: 'dijit', location: 'content/dojo/dijit' },
            { name: 'dojox', location: 'content/dojo/dojox' }
        ]
    });
    </script>
    <script type="text/javascript" src="content/dojo/dojox/gfx.js"></script>
    <script type="text/javascript" src="content/dojo/dojo-dependencies.js"></script>

    <!-- Core -->
    <script type="text/javascript" src="content/javascript/argos-dependencies.js"></script>
    <script type="text/javascript" src="content/javascript/argos-sdk.js"></script>
    <script type="text/javascript">
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    </script>

    <!-- Application -->
    <script type="text/javascript" src="content/javascript/argos-billable.js"></script>

    <!-- Modules -->
    <!--{{modules}}-->

    <script type="text/javascript">
    (function() {
        var application = 'Mobile/BillableServices/Application',
            configuration = <%= Serialize(
                Enumerate("configuration", (file) => file.Name == "production.js")
                    .Select(item => item.Path.Substring(0, item.Path.Length - 3))
            ) %>;
        require([application].concat(configuration), function(application, configuration) {
            var localization = <%= Serialize(
                EnumerateLocalizations("localization")
                    .Select(item => item.Path.Substring(0, item.Path.Length - 3))
            ) %>;
            require(localization.concat('dojo/domReady!'), function() {
                var instance = new application(configuration);

                instance.activate();
                instance.startup();
                instance.run();
            });
        });
    })();
    </script>
</head>
<body class="has-hidden-plus-bar">
</body>
</html>

<script type="text/C#" runat="server">
    protected class FileItem
    {
        public string Path { get; set; }
        public FileInfo File { get; set; }
    }

    protected string Serialize(object item)
    {
        var serializer = new JavaScriptSerializer();
        return serializer.Serialize(item);
    }

    protected string ToRelativeUrlPath(DirectoryInfo rootDirectory, FileInfo file)
    {
        var rootPath = rootDirectory.FullName;
        var filePath = file.FullName;

        if (filePath.StartsWith(rootPath))
        {
            var relativePath = filePath.Substring(rootPath.Length + 1);
            return relativePath.Replace('\\', '/');
        }

        throw new ApplicationException("Invalid root path specified.");
    }

    protected IEnumerable<FileItem> Enumerate(string path, Predicate<FileInfo> predicate)
    {
        var rootDirectory = new DirectoryInfo(Path.GetDirectoryName(Request.PhysicalPath));
        var includeDirectory = new DirectoryInfo(Path.Combine(rootDirectory.FullName, path));

        if (includeDirectory.Exists)
        {
            var files = includeDirectory.GetFiles("*", SearchOption.AllDirectories).AsEnumerable();

            if (predicate != null) files = files.Where(file => predicate(file));

            foreach (var file in files)
                yield return new FileItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, file),
                    File = file
                };
        }
    }

    protected IEnumerable<FileItem> Enumerate(string path)
    {
        return Enumerate(path, (file) => true);
    }

    protected IEnumerable<FileItem> Enumerate(string path, Regex include)
    {
        return Enumerate(path, (file) => include.IsMatch(file.Name));
    }

    protected IEnumerable<FileItem> EnumerateLocalizations(string path)
    {
        return EnumerateLocalizations(String.Empty, path);
    }

    protected IEnumerable<FileItem> EnumerateLocalizations(string root, string path)
    {
        var currentCulture = System.Globalization.CultureInfo.CurrentCulture;
        var rootDirectory = new DirectoryInfo(Path.Combine(Path.GetDirectoryName(Request.PhysicalPath), root));
        var includeDirectory = new DirectoryInfo(Path.Combine(rootDirectory.FullName, path));

        if (includeDirectory.Exists)
        {
            var parentFileName = String.Format(@"{0}.js", currentCulture.Parent.Name);
            var parentFile = new FileInfo(Path.Combine(includeDirectory.FullName, parentFileName));
            var targetFileName = String.Format(@"{0}.js", currentCulture.Name);
            var targetFile = new FileInfo(Path.Combine(includeDirectory.FullName, targetFileName));

            if (targetFile.Exists)
                yield return new FileItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, targetFile),
                    File = targetFile
                };
            else if (parentFile.Exists)
                yield return new FileItem
                {
                    Path = ToRelativeUrlPath(rootDirectory, parentFile),
                    File = targetFile
                };

            foreach (var moduleDirectory in includeDirectory.GetDirectories())
            {
                parentFile = new FileInfo(Path.Combine(moduleDirectory.FullName, parentFileName));
                targetFile = new FileInfo(Path.Combine(moduleDirectory.FullName, targetFileName));

                if (targetFile.Exists)
                    yield return new FileItem
                    {
                        Path = ToRelativeUrlPath(rootDirectory, targetFile),
                        File = targetFile
                    };
                else if (parentFile.Exists)
                    yield return new FileItem
                    {
                        Path = ToRelativeUrlPath(rootDirectory, parentFile),
                        File = targetFile
                    };   
            }    
        }
    }
     
</script>