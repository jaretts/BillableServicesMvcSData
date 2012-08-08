using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.Practices.Unity;
using Sage.SData.Repository;
using Sage.SData.Compiler;
using System.Reflection;
using Sage.SDataHandler.Compiler;
using System.IO;

namespace Sage.SDataHandler
{
    public class DependencyManager
    {

        static List<string> DefaultAssemblies = new List<string>{
                                        "Sage.SDataHandler.dll",
                                        "System.Web.Http.dll",
                                        "Microsoft.Practices.Unity.dll"
                                        };

        public const string GEN_DLL_NAME = "GenController.dll";

        string pathToAssemblies; //@"C:\pvxtst\billable"; //

        static DependencyManager single;

        static public DependencyManager getInstance()
        {
            if (single == null)
            {
                single = new DependencyManager();
            }

            return single;
        }

        private DependencyManager()
        {
            pathToAssemblies = HttpContext.Current.Server.MapPath("~/bin");
        }

        // just builds simple controllers
        public void BuildDefaultControllers()
        {
            string[] files = Directory.GetFileSystemEntries(pathToAssemblies, "*.dll");
            BuildDefaultControllers(files);
        }

        // just builds simple controllers
        public void BuildDefaultControllers(string[] assembliesToSearch)
        {
            Assembly assembly = GenerateSourceAndCompile(false, assembliesToSearch);
        }

        // Builds controllers and handles Dependency injection with unity and IOC
        public void RegisterDependencyResolver(HttpConfiguration httpConfig)
        {
            string[] files = Directory.GetFileSystemEntries(pathToAssemblies, "*.dll");
            RegisterDependencyResolver(httpConfig, files);
        }

        // Builds controllers and handles Dependency injection with unity and IOC
        public void RegisterDependencyResolver(HttpConfiguration httpConfig, string[] assembliesToSearch)
        {
            Assembly assembly = GenerateSourceAndCompile(true, assembliesToSearch);
            if (assembly != null)
            {
                // now register dependencies
                DoRegisterDependencies(httpConfig, assembly);
            }
        }

        private Assembly GenerateSourceAndCompile(bool generateWithDependencyResolver, string[] files)
        {
            Assembly assembly = GetPreviousBuild();
            if (assembly != null)
            {
                return assembly;
            }

            List<string> requiredAssemblies = new List<string>();
            Dictionary<string, string> modelClassNameMap = new Dictionary<string, string>();

            List<string> discoveredControllers = new List<string>();

            string fullNameOfRepo = null;

            foreach (string file in files)
            {
                Assembly asm = Assembly.LoadFile(file);

                Type[] types = asm.GetTypes();

                foreach (Type type in types)
                {
                    bool asmRequired = false;

                    if (type.BaseType == typeof(MobileModelEntity))
                    {
                        // found model calss
                        modelClassNameMap.Add(type.Name, type.FullName);

                        asmRequired = true;
                    }
                    else if (IsApiControllerType(type))
                    {
                        // found a controller
                        discoveredControllers.Add(type.Name);
                    }
                    else if (fullNameOfRepo == null)
                    {
                        if (type.GetInterface(typeof(IRepository<>).Name) != null)
                        {
                            fullNameOfRepo = type.FullName;

                            if (type.IsGenericType)
                                fullNameOfRepo = fullNameOfRepo.Remove(fullNameOfRepo.IndexOf('`'));

                            asmRequired = true;
                        }
                    }

                    if (asmRequired && !requiredAssemblies.Contains(file))
                    {
                        requiredAssemblies.Add(file);
                    }
                } // eo for each type in assembly

            } // eo for each assembly in directory

            if (fullNameOfRepo != null)
            {

                string[] modelClasses = modelClassNameMap.Values.ToArray<string>();

                string source;
                if (generateWithDependencyResolver)
                {
                    ControllerTemplate2 prtt = new ControllerTemplate2(modelClasses, fullNameOfRepo);
                    source = prtt.TransformText();
                }
                else
                {
                    ControllerTemplate3 prtt = new ControllerTemplate3(modelClasses, fullNameOfRepo, discoveredControllers);
                    source = prtt.TransformText();
                }

                string pathToServerBin = HttpContext.Current.Server.MapPath("~/bin");
                return DoCompile(requiredAssemblies, pathToServerBin, source);
            }

            return null;
        }

        public bool IsApiControllerType(Type type)
        {
            if(type != null)
            {
                Type baseType = type.BaseType;
                while (baseType != null)
                {
                    if (baseType == typeof(ApiController))
                    {
                        return true;
                    }

                    baseType = baseType.BaseType;
                }
            }

            return false;
        }

        public void RegisterDependencyResolver(HttpConfiguration httpConfig,
                                                        string modelLocation,
                                                        string modelNameSpace,
                                                        string repositoryNameSpace,
                                                        List<string> requiredAssemblies,
                                                        string pathToAssemblies)
        {
            ControllerTemplate1 prtt = new ControllerTemplate1(modelLocation, modelNameSpace, repositoryNameSpace);
            string txt = prtt.TransformText();

            Assembly assembly = DoCompile(requiredAssemblies, pathToAssemblies, txt);

            // now register dependencies
            DoRegisterDependencies(httpConfig, assembly);
        }

        private void DoRegisterDependencies(HttpConfiguration httpConfig, Assembly assembly)
        {
            IDependencyUtil anobj = (IDependencyUtil)assembly.CreateInstance("Sage.SData.Compiler.DependencyUtil");
            UnityContainer unity = anobj.RegisterDependencyResolver(httpConfig);
            httpConfig.DependencyResolver = new IoCContainer(unity);
        }

        private Assembly DoCompile(List<string> requiredAssemblies, string pathToAssemblies, string asSourceStr)
        {
            // path to where SDataHandler dll and BillableModel.dll arez
            Assembly assembly = GetPreviousBuild();

            if (assembly == null)
            {
                CSTextCompiler comp = new CSTextCompiler();

                List<string> allAssembs = new List<string>();
                allAssembs.AddRange(DefaultAssemblies);
                allAssembs.AddRange(requiredAssemblies);

                string[] listOfReferencedAssemblies = allAssembs.ToArray<string>();

                assembly = comp.Compile(pathToAssemblies, GEN_DLL_NAME, pathToAssemblies, listOfReferencedAssemblies, asSourceStr);
            }

            return assembly;
        }

        private Assembly GetPreviousBuild()
        {
            Assembly assembly = null;
            string genCodeAssembly = pathToAssemblies + "\\" + GEN_DLL_NAME;
            if (File.Exists(genCodeAssembly))
            {
                //if (IsFileLocked(genCodeAssembly))
                    assembly = Assembly.LoadFile(genCodeAssembly);
            }
            return assembly;
        }


        bool IsFileLocked(string filePath)
        {
            FileInfo file = new FileInfo(filePath);
            FileStream stream = null;

            try
            {
                stream = file.Open(FileMode.Open, FileAccess.ReadWrite, FileShare.None);
            }
            catch (IOException)
            {
                //the file is unavailable because it is:
                //still being written to
                //or being processed by another thread
                //or does not exist (has already been processed)
                return true;
            }
            finally
            {
                if (stream != null)
                    stream.Close();
            }

            //file is not locked
            return false;
        }
    }

}
