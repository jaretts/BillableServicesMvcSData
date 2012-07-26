﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Sage.SDataHandler;
using Microsoft.Practices.Unity;
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

            DependencyUtil.RegisterDependencyResolver(GlobalConfiguration.Configuration);
            GlobalConfiguration.Configuration.MessageHandlers.Add(new SDataHandler());

        }

    }
}