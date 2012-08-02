using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dependencies;
using Microsoft.Practices.Unity;
using Sage.SData.Repository;
using Sage.SData.Compiler;
using System.Reflection;
using Sage.SDataHandler.Compiler;

namespace Sage.SDataHandler
{
    public class DependencyManager
    {
        static Assembly assembly;

        static List<string> DefaultAssemblies = new List<string>{
                                        "Sage.SDataHandler.dll",
                                        "System.Web.Http.dll",
                                        "Microsoft.Practices.Unity.dll"
                                        };


        public static void RegisterDependencyResolver(HttpConfiguration httpConfig,
                                                        string modelLocation,
                                                        string modelNameSpace,
                                                        string repositoryNameSpace,
                                                        List<string> requiredAssemblies,
                                                        string pathToAssemblies)
        {
            UnityContainer unity = new UnityContainer();

            ControllerTemplate1 prtt = new ControllerTemplate1(modelLocation, modelNameSpace, repositoryNameSpace);

            string txt = prtt.TransformText();

            CSTextCompiler comp = new CSTextCompiler();

            // path to where SDataHandler dll and BillableModel.dll are
            string outputAssemblyPath = pathToAssemblies; // @"C:\pvxtst\billable";
            string outputAssemblyName = "GenController.dll";

            string asSourceStr = txt;

            List<string> allAssembs = new List<string>();
            allAssembs.AddRange(DefaultAssemblies);
            allAssembs.AddRange(requiredAssemblies);

            string[] listOfReferencedAssemblies = allAssembs.ToArray<string>();

            assembly = comp.Compile(pathToAssemblies, outputAssemblyName, outputAssemblyPath, listOfReferencedAssemblies, asSourceStr);

            IDependencyUtil anobj = (IDependencyUtil)assembly.CreateInstance("Sage.SData.Compiler.DependencyUtil");

            anobj.RegisterDependencyResolver(httpConfig);

        }

        public static Type[] GetControllerType()
        {
            return assembly.GetTypes();
        }
    }

}
