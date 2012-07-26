 

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BillableModel.Models;
using SDataRepository;

namespace BillableServicesMvcSData.Controllers
{
	
	    public class AbcChargeController : DefaultController<AbcCharge>
	    { 
			public AbcChargeController(IRepository<AbcCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public AbcCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.AbcChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class ApprovedServiceChargeController : DefaultController<ApprovedServiceCharge>
	    { 
			public ApprovedServiceChargeController(IRepository<ApprovedServiceCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public ApprovedServiceCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ApprovedServiceChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class BillingScheduleController : DefaultController<BillingSchedule>
	    { 
			public BillingScheduleController(IRepository<BillingSchedule> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public BillingSchedule GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.BillingScheduleID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class ContactController : DefaultController<Contact>
	    { 
			public ContactController(IRepository<Contact> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public Contact GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ContactID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class CustomerController : DefaultController<Customer>
	    { 
			public CustomerController(IRepository<Customer> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public Customer GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.CustomerID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class ProjectController : DefaultController<Project>
	    { 
			public ProjectController(IRepository<Project> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public Project GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ProjectID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class ServiceChargeController : DefaultController<ServiceCharge>
	    { 
			public ServiceChargeController(IRepository<ServiceCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public ServiceCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ServiceChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class ServiceDetailController : DefaultController<ServiceDetail>
	    { 
			public ServiceDetailController(IRepository<ServiceDetail> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public ServiceDetail GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ServiceDetailID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class ServiceTypeController : DefaultController<ServiceType>
	    { 
			public ServiceTypeController(IRepository<ServiceType> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public ServiceType GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ServiceTypeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class UserController : DefaultController<User>
	    { 
			public UserController(IRepository<User> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public User GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.UserID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwBillingDetailController : DefaultController<vwBillingDetail>
	    { 
			public vwBillingDetailController(IRepository<vwBillingDetail> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwBillingDetail GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwBillingDetailID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwBillingDetailIndexController : DefaultController<vwBillingDetailIndex>
	    { 
			public vwBillingDetailIndexController(IRepository<vwBillingDetailIndex> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwBillingDetailIndex GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwBillingDetailIndexID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwBillingScheduleController : DefaultController<vwBillingSchedule>
	    { 
			public vwBillingScheduleController(IRepository<vwBillingSchedule> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwBillingSchedule GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwBillingScheduleID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwClientServiceChargeController : DefaultController<vwClientServiceCharge>
	    { 
			public vwClientServiceChargeController(IRepository<vwClientServiceCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwClientServiceCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwClientServiceChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwProjectController : DefaultController<vwProject>
	    { 
			public vwProjectController(IRepository<vwProject> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwProject GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwProjectID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsContactController : DefaultController<vwsContact>
	    { 
			public vwsContactController(IRepository<vwsContact> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsContact GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsContactID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsCustomerController : DefaultController<vwsCustomer>
	    { 
			public vwsCustomerController(IRepository<vwsCustomer> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsCustomer GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsCustomerID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwServiceChargeController : DefaultController<vwServiceCharge>
	    { 
			public vwServiceChargeController(IRepository<vwServiceCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwServiceCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwServiceChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsProjectController : DefaultController<vwsProject>
	    { 
			public vwsProjectController(IRepository<vwsProject> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsProject GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsProjectID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsServiceChargeController : DefaultController<vwsServiceCharge>
	    { 
			public vwsServiceChargeController(IRepository<vwsServiceCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsServiceCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsServiceChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsServiceChargeDetailController : DefaultController<vwsServiceChargeDetail>
	    { 
			public vwsServiceChargeDetailController(IRepository<vwsServiceChargeDetail> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsServiceChargeDetail GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsServiceChargeDetailID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsServiceTypeController : DefaultController<vwsServiceType>
	    { 
			public vwsServiceTypeController(IRepository<vwsServiceType> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsServiceType GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsServiceTypeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsUserController : DefaultController<vwsUser>
	    { 
			public vwsUserController(IRepository<vwsUser> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsUser GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsUserID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwsUserChargesDailyController : DefaultController<vwsUserChargesDaily>
	    { 
			public vwsUserChargesDailyController(IRepository<vwsUserChargesDaily> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwsUserChargesDaily GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwsUserChargesDailyID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwTenantChargesDailyController : DefaultController<vwTenantChargesDaily>
	    { 
			public vwTenantChargesDailyController(IRepository<vwTenantChargesDaily> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwTenantChargesDaily GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwTenantChargesDailyID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwTenantChargesMonthlyController : DefaultController<vwTenantChargesMonthly>
	    { 
			public vwTenantChargesMonthlyController(IRepository<vwTenantChargesMonthly> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwTenantChargesMonthly GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwTenantChargesMonthlyID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	
	    public class vwTenantChargesWeeklyController : DefaultController<vwTenantChargesWeekly>
	    { 
			public vwTenantChargesWeeklyController(IRepository<vwTenantChargesWeekly> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName("SDataSingleResourceKind")] 
	        override public vwTenantChargesWeekly GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.vwTenantChargesWeeklyID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
		}
	
	}
	
	
	
