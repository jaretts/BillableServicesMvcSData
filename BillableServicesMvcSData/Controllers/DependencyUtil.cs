
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dependencies;
using Microsoft.Practices.Unity;
using SDataRepository;
using BillableModel.Models;
using DbSetRepository;
 

namespace BillableServicesMvcSData.Controllers
{
	
		internal class DependencyUtil
		{
			internal static void RegisterDependencyResolver(HttpConfiguration httpConfig)
			{
					UnityContainer unity = new UnityContainer();
					unity.RegisterType<ApprovedServiceChargeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<ApprovedServiceCharge>, DbContextRepository<ApprovedServiceCharge>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<BillingScheduleController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<BillingSchedule>, DbContextRepository<BillingSchedule>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<ContactController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<Contact>, DbContextRepository<Contact>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<CustomerController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<Customer>, DbContextRepository<Customer>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<ProjectController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<Project>, DbContextRepository<Project>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<ServiceChargeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<ServiceCharge>, DbContextRepository<ServiceCharge>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<ServiceDetailController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<ServiceDetail>, DbContextRepository<ServiceDetail>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<ServiceTypeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<ServiceType>, DbContextRepository<ServiceType>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<UserController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<User>, DbContextRepository<User>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
	
	
					httpConfig.DependencyResolver = new IoCContainer(unity);
			}
		}
	
	    class ScopeContainer : IDependencyScope
	    {
	        protected IUnityContainer container;
	
	        public ScopeContainer(IUnityContainer container)
	        {
	            if (container == null)
	            {
	                throw new ArgumentNullException("container");
	            }
	            this.container = container;
	        }
	
	        public object GetService(Type serviceType)
	        {
	            if (container.IsRegistered(serviceType))
	            {
	                return container.Resolve(serviceType);
	            }
	            else
	            {
	                return null;
	            }
	        }
	
	        public IEnumerable<object> GetServices(Type serviceType)
	        {
	            if (container.IsRegistered(serviceType))
	            {
	                return container.ResolveAll(serviceType);
	            }
	            else
	            {
	                return new List<object>();
	            }
	        }
	
	        public void Dispose()
	        {
	            container.Dispose();
	        }
	    }
	
	    class IoCContainer : ScopeContainer, IDependencyResolver
	    {
	        public IoCContainer(IUnityContainer container)
	            : base(container)
	        {
	        }
	
	        public IDependencyScope BeginScope()
	        {
	            var child = container.CreateChildContainer();
	            return new ScopeContainer(child);
	        }
	    }
	
}
