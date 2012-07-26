
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
					unity.RegisterType<AbcChargeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<AbcCharge>, DbContextRepository<AbcCharge>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
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
					unity.RegisterType<vwBillingDetailController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwBillingDetail>, DbContextRepository<vwBillingDetail>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwBillingDetailIndexController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwBillingDetailIndex>, DbContextRepository<vwBillingDetailIndex>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwBillingScheduleController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwBillingSchedule>, DbContextRepository<vwBillingSchedule>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwClientServiceChargeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwClientServiceCharge>, DbContextRepository<vwClientServiceCharge>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwProjectController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwProject>, DbContextRepository<vwProject>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsContactController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsContact>, DbContextRepository<vwsContact>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsCustomerController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsCustomer>, DbContextRepository<vwsCustomer>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwServiceChargeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwServiceCharge>, DbContextRepository<vwServiceCharge>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsProjectController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsProject>, DbContextRepository<vwsProject>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsServiceChargeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsServiceCharge>, DbContextRepository<vwsServiceCharge>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsServiceChargeDetailController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsServiceChargeDetail>, DbContextRepository<vwsServiceChargeDetail>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsServiceTypeController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsServiceType>, DbContextRepository<vwsServiceType>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsUserController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsUser>, DbContextRepository<vwsUser>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwsUserChargesDailyController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwsUserChargesDaily>, DbContextRepository<vwsUserChargesDaily>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwTenantChargesDailyController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwTenantChargesDaily>, DbContextRepository<vwTenantChargesDaily>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwTenantChargesMonthlyController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwTenantChargesMonthly>, DbContextRepository<vwTenantChargesMonthly>>(
										new HierarchicalLifetimeManager(),
										new InjectionConstructor(new BillableServicesEntities()));
					unity.RegisterType<vwTenantChargesWeeklyController>();
	
					// Register the Repository for the Controller
					unity.RegisterType<IRepository<vwTenantChargesWeekly>, DbContextRepository<vwTenantChargesWeekly>>(
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
