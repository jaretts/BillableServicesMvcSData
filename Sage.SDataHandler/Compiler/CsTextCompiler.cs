using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.CodeDom.Compiler;
using System.IO;
using Microsoft.CSharp;
using System.Reflection;
using System.Runtime.Remoting;

namespace Sage.SData.Compiler
{
    public class CSTextCompiler
    {
        #region private / protected
        private string _sTempSDataDirName = null;
        #endregion

        public CSTextCompiler()
        {
        }
        public bool CleanUpAssemblyCache()
        {
            System.Diagnostics.Debug.Assert(!string.IsNullOrEmpty(_sTempSDataDirName));

            bool bSuccess = true;
            DirectoryInfo dir = new DirectoryInfo(_sTempSDataDirName);
            if (dir.Exists)
            {
                foreach (System.IO.FileInfo file in dir.GetFiles())
                {
                    try
                    {
                        file.Delete();
                    }
                    catch
                    {
                        bSuccess = false;
                    }
                }
            }
            return bSuccess;
        }
        public string TempAssemblyDir
        {
            get { return _sTempSDataDirName; }
            set
            {
                System.Diagnostics.Debug.Assert(!string.IsNullOrEmpty(value));
                _sTempSDataDirName = value;
                // create assembly cache folder
                DirectoryInfo dir = new DirectoryInfo(_sTempSDataDirName);
                if (!dir.Exists) dir.Create();
            }
        }
        public Assembly Compile(string sBaseRefPath, string sOutputAssemblyFileName, string sOutputAssemblyFileDirectory, string[] asReferencedAssemblies, string asSourceStr)
        {
            return CompileText(sBaseRefPath, sOutputAssemblyFileName, sOutputAssemblyFileDirectory, asReferencedAssemblies, asSourceStr);
        }
        #region private / protected
        // generate assembly
        protected Assembly CompileText(string sBaseRefPath, string sOutputAssemblyFileName, string sOutputAssemblyFileDirectory, string[] asReferencedAssemblies, string asSourceStr)
        {
            _sTempSDataDirName = sOutputAssemblyFileDirectory;
            System.Diagnostics.Debug.Assert(!string.IsNullOrEmpty(_sTempSDataDirName));

            string sSaveCurDir = Directory.GetCurrentDirectory();
            Directory.SetCurrentDirectory(sBaseRefPath);

            CSharpCodeProvider codeProvider = new CSharpCodeProvider(new Dictionary<String, String> { { "CompilerVersion", "v4.0" } });

            CompilerParameters parameters = new CompilerParameters();
            parameters.GenerateInMemory = false;
            parameters.OutputAssembly = Path.Combine(_sTempSDataDirName, sOutputAssemblyFileName);

            parameters.GenerateExecutable = false;
            parameters.IncludeDebugInformation = false;
            parameters.TreatWarningsAsErrors = false;
            string sss = parameters.CompilerOptions;
            parameters.CompilerOptions = "/optimize";
            parameters.CompilerOptions = "/platform:x86";

            parameters.ReferencedAssemblies.Add("system.dll");
            parameters.ReferencedAssemblies.Add("System.Data.dll");
            parameters.ReferencedAssemblies.Add("System.Xml.dll");

            parameters.ReferencedAssemblies.Add("system.dll");
            parameters.ReferencedAssemblies.Add("System.Data.dll");
            parameters.ReferencedAssemblies.Add("System.Xml.dll");

            /*
            parameters.ReferencedAssemblies.Add(Path.Combine(sBaseRefPath, "Sage.Common.Syndication.dll"));
            parameters.ReferencedAssemblies.Add(Path.Combine(sBaseRefPath, "Sage.Integration.Client.dll"));
            parameters.ReferencedAssemblies.Add(Path.Combine(sBaseRefPath, "Sage.Integration.Diagnostics.dll"));
            parameters.ReferencedAssemblies.Add(Path.Combine(sBaseRefPath, "Sage.Integration.Server.dll"));
            parameters.ReferencedAssemblies.Add(Path.Combine(sBaseRefPath, "Sage.Integration.Server.Feeds.dll"));
            parameters.ReferencedAssemblies.Add(Path.Combine(sBaseRefPath, "Sage.Integration.Server.Model.dll"));
            parameters.ReferencedAssemblies.Add(Path.Combine(sBaseRefPath, "Sage.MAS.SData.MAS90Adapter.dll"));
            */
              
            foreach (string sRefAsm in asReferencedAssemblies) parameters.ReferencedAssemblies.Add(sRefAsm);

            CompilerResults results = null;
            try
            {
                results = codeProvider.CompileAssemblyFromSource(parameters, asSourceStr);
            }
            finally
            {
                Directory.SetCurrentDirectory(sSaveCurDir);
            }

            if (results.Errors.HasErrors)
            {
#if DEBUG
                // *** detailed diagnostics ***
                StringBuilder asErrors = new StringBuilder();
                for (int i = 0; i < results.Errors.Count; i++)
                {
                    asErrors.Append(results.Errors[i].ErrorText);
                }
                throw new Exception(asErrors.ToString());
#else
                throw new Exception("C# error. Please contact Sage.");
#endif
            }
            return results.CompiledAssembly;
        }
        #endregion
    }
}
