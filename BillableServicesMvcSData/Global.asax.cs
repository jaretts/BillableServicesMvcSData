using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Sage.SDataHandler;
using Microsoft.Practices.Unity;
using BillableServicesMvcSData.DependencyResolvers;
using BillableServicesMvcSData.Controllers;
using SDataRepository;
using BillableModel.Models;
using DbSetRepository;

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

            RegisterDependencyResolver();
            GlobalConfiguration.Configuration.MessageHandlers.Add(new SDataHandler());

        }

        private static void RegisterDependencyResolver()
        {
            UnityContainer unity = new UnityContainer();

            // Register the Customer Controller
            unity.RegisterType<CustomerController>();

            // Register the Repository for the CustomerController, need to provide a constructor with MongoDB Collection Name
            unity.RegisterType<IRepository<Customer>, DbContextRepository<Customer>>(
                                new HierarchicalLifetimeManager(),
                                new InjectionConstructor(new BillableServicesEntities()));

            // Register the Customer Controller
            unity.RegisterType<ContactController>();

            // Register the Repository for the CustomerController, need to provide a constructor with MongoDB Collection Name
            unity.RegisterType<IRepository<Contact>, DbContextRepository<Contact>>(
                                new HierarchicalLifetimeManager(),
                                new InjectionConstructor(new BillableServicesEntities()));

            // Register the ApprovedChargeController Controller
            unity.RegisterType<ApprovedServiceChargeController>();

            // Register the Repository for the CustomerController, need to provide a constructor with MongoDB Collection Name
            unity.RegisterType<IRepository<ApprovedServiceCharge>, DbContextRepository<ApprovedServiceCharge>>(
                                new HierarchicalLifetimeManager(),
                                new InjectionConstructor(new BillableServicesEntities()));

            // Register the Customer Controller
            unity.RegisterType<ServiceChargeController>();

            // Register the Repository for the CustomerController, need to provide a constructor with MongoDB Collection Name
            unity.RegisterType<IRepository<ServiceCharge>, DbContextRepository<ServiceCharge>>(
                                new HierarchicalLifetimeManager(),
                                new InjectionConstructor(new BillableServicesEntities()));


            GlobalConfiguration.Configuration.DependencyResolver = new IoCContainer(unity);
        }
    }
}