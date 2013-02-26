using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Sage.SDataHandler;
using WebApiSecurity;

namespace BillableServicesMvcSData
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //SecurityConfig.ConfigureGlobal(GlobalConfiguration.Configuration);

            // These 3 lines add SData Support:

            // 1. Register SData Routes
            SDataRoutesUtil.GetInstance().RegisterSDataRoutes("sdata/billserv/billserv/-", RouteTable.Routes);

            // 2. Call BuildDefaultController with no arguments and DependencyManager will search 
            // the server's bin directory for Repository (implements) IRepository & Model (extends) SDataModelEntity
            // Make sure required DLLs are in bin directory; E.G. BillableModel
            //DependencyManager.BuildDefaultControllers();

            // 3. Add SData JSON and URL handling support
            SDataHandler sh = new SDataHandler();
            GlobalConfiguration.Configuration.MessageHandlers.Add(sh);

        }


        /* if you want lots of control can provide lots of information to Dependency Resolver
        private static void RegisterControllerDependenciesVerbose()
        {
            string modelLocation = @"C:\Apps\workspaces\web api demos\billableservices\BillableServicesMvcSData\BillableModel\Models";
            string modelNameSpace = "BillableModel.Models";
            string repositoryNameSpace = "DbSetRepository";
            string pathToAssemblies = @"C:\Apps\workspaces\web api demos\billableservices\BillableServicesMvcSData\BillableServicesMvcSData\bin";
            List<string> requiredAssemblies = new List<string>() { "BillableModel.dll", "DbSetRepository.dll" };

            DependencyManager.RegisterDependencyResolver(GlobalConfiguration.Configuration, modelLocation, modelNameSpace, repositoryNameSpace, requiredAssemblies, pathToAssemblies);
        }*/

    }
}