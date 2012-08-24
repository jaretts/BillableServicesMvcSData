using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Sage.SData.Repository;
using Sage.SData.Compiler;
using System.Reflection;
using System.IO;

namespace Sage.SDataHandler
{
    public class DependencyManager
    {

        static List<string> DefaultAssemblies = new List<string>{
                                        //"Sage.SDataHandler.dll",
                                        "System.Web.Http.dll"
                                        //, "Microsoft.Practices.Unity.dll"
                                        };

        public const string GEN_DLL_NAME = "GenController.dll";

        static string pathToAssemblies = HttpContext.Current.Server.MapPath("~/bin");

        // just builds simple controllers
        static public void BuildDefaultControllers()
        {
            string[] files = Directory.GetFileSystemEntries(pathToAssemblies, "*.dll");
            BuildDefaultControllers(files);
        }

        // just builds simple controllers
        static public void BuildDefaultControllers(string[] assembliesToSearch)
        {
            Assembly assembly = GenerateSourceAndCompile(false, assembliesToSearch);
        }

        // Builds controllers and handles Dependency injection with unity and IOC
        static public void RegisterDependencyResolver(HttpConfiguration httpConfig)
        {
            string[] files = Directory.GetFileSystemEntries(pathToAssemblies, "*.dll");
            RegisterDependencyResolver(httpConfig, files);
        }

        // Builds controllers and handles Dependency injection with unity and IOC
        static public void RegisterDependencyResolver(HttpConfiguration httpConfig, string[] assembliesToSearch)
        {
            Assembly assembly = GenerateSourceAndCompile(true, assembliesToSearch);
            if (assembly != null)
            {
                // now register dependencies
                DoRegisterDependencies(httpConfig, assembly);
            }
        }

        static private Assembly GenerateSourceAndCompile(bool generateWithDependencyResolver, string[] files)
        {
            Assembly assembly = GetPreviousBuild();
            if (assembly != null)
            {
                return assembly;
            }

            List<string> requiredAssemblies = new List<string>();
            AddRequiredAssembly(typeof(SDataHandler).Assembly, requiredAssemblies);

            Dictionary<string, string> modelClassNameMap = new Dictionary<string, string>();

            List<string> discoveredControllers = new List<string>();

            string fullNameOfRepo = null;

            foreach (string file in files)
            {
                string validFilePath = ValidateAssemblyFilePath(file);
                if (String.IsNullOrEmpty(validFilePath))
                    continue;

                Assembly asm = Assembly.LoadFile(validFilePath);

                Type[] types = asm.GetTypes();

                foreach (Type type in types)
                {
                    bool asmRequired = false;

                    //if (type.BaseType == typeof(SDataModelEntity))
                    if (IsParentTypeMatch(type, typeof(SDataModelEntity)))
                    {
                        // found model calss
                        modelClassNameMap.Add(type.Name, type.FullName);

                        asmRequired = true;
                    }
                    //else if (IsApiControllerType(type))
                    else if (IsParentTypeMatch(type, typeof(ApiController)))
                    {
                        // found a controller
                        discoveredControllers.Add(type.Name);
                    }
                    else if (fullNameOfRepo == null)
                    {
                        if (type.GetInterface(typeof(IRepository<>).Name) != null)
                        {
                            // check if this type can be instantiated; it might be 
                            // an abstract class like the DefaultDbRepository class
                            // If the type is abstract need to keep searching for repository
                            if(!type.IsAbstract)
                            {
                                fullNameOfRepo = type.FullName;

                                if (type.IsGenericType)
                                    fullNameOfRepo = fullNameOfRepo.Remove(fullNameOfRepo.IndexOf('`'));
                            }

                            asmRequired = true;

                        }
                    }

                    if ( asmRequired )
                    {
                        if (!requiredAssemblies.Contains(file))
                        {
                            requiredAssemblies.Add(file);
                        }

                        // added the assembly this type is declared in, now check 
                        // for base types this type is derived from and if they're in
                        // different asseblies add those assemblies too
                        AddParentTypeAssemblies(type, requiredAssemblies);

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

        private static string ValidateAssemblyFilePath(string file)
        {
            string validFilePath = null;
            if (File.Exists(file))
            {
                validFilePath = file;
            }
            else
            {
                // try to find file in the server's bin
                if (!file.Contains(pathToAssemblies))
                {
                    string serverBinFilePath = pathToAssemblies + "\\" + file;

                    if (File.Exists(serverBinFilePath))
                    {
                        validFilePath = serverBinFilePath;
                    }
                }
            }
            return validFilePath;
        }

        static public void AddParentTypeAssemblies(Type type, List<string> requiredAssemblies)
        {
            if (type != null)
            {
                Type baseType = type.BaseType;
                while (baseType != null)
                {
                    AddRequiredAssembly(baseType.Assembly, requiredAssemblies);
                    baseType = baseType.BaseType;
                }
            }
        }

        public static void AddRequiredAssembly(Assembly asm, List<string> requiredAssemblies)
        {
            string assemblyLoc = asm.Location;
            //string assemblyLoc = baseType.Assembly.GetName().Name;
            //string assemblyLoc = baseType.Assembly.FullName;
            if (!requiredAssemblies.Contains(assemblyLoc))
            {
                requiredAssemblies.Add(assemblyLoc);
            }
        }

        static public bool IsParentTypeMatch(Type type, Type searchType)
        {
            if (type != null)
            {
                Type baseType = type.BaseType;
                while (baseType != null)
                {
                    if (baseType == searchType)
                    {
                        return true;
                    }

                    baseType = baseType.BaseType;
                }
            }

            return false;
        }

        static public void RegisterDependencyResolver(HttpConfiguration httpConfig,
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

        static private void DoRegisterDependencies(HttpConfiguration httpConfig, Assembly assembly)
        {
            /*
            IDependencyUtil anobj = (IDependencyUtil)assembly.CreateInstance("Sage.SData.Compiler.DependencyUtil");
            UnityContainer unity = anobj.RegisterDependencyResolver(httpConfig);
            httpConfig.DependencyResolver = new IoCContainer(unity);
             */
        }

        static private Assembly DoCompile(List<string> requiredAssemblies, string pathToAssemblies, string asSourceStr)
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

        static private Assembly GetPreviousBuild()
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
