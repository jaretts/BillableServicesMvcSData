 

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BillableModel.Models;
using SDataRepository;
using Sage.SDataHandler;

namespace BillableServicesMvcSData.Controllers
{
	
	    public class ApprovedServiceChargeController : DefaultController<ApprovedServiceCharge>
	    { 
			public ApprovedServiceChargeController(IRepository<ApprovedServiceCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ApprovedServiceCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ApprovedServiceChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ApprovedServiceCharge GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class BillingScheduleController : DefaultController<BillingSchedule>
	    { 
			public BillingScheduleController(IRepository<BillingSchedule> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public BillingSchedule GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.BillingScheduleID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public BillingSchedule GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class ContactController : DefaultController<Contact>
	    { 
			public ContactController(IRepository<Contact> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public Contact GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ContactID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public Contact GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class CustomerController : DefaultController<Customer>
	    { 
			public CustomerController(IRepository<Customer> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public Customer GetSingle(int selector, String select)
	        {
	            return base.GetCollection(select).FirstOrDefault(y => y.CustomerID == selector);
	            //return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public Customer GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class ProjectController : DefaultController<Project>
	    { 
			public ProjectController(IRepository<Project> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public Project GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ProjectID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public Project GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class ServiceChargeController : DefaultController<ServiceCharge>
	    { 
			public ServiceChargeController(IRepository<ServiceCharge> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ServiceCharge GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ServiceChargeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ServiceCharge GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class ServiceDetailController : DefaultController<ServiceDetail>
	    { 
			public ServiceDetailController(IRepository<ServiceDetail> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ServiceDetail GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ServiceDetailID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ServiceDetail GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class ServiceTypeController : DefaultController<ServiceType>
	    { 
			public ServiceTypeController(IRepository<ServiceType> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ServiceType GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.ServiceTypeID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public ServiceType GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	
	    public class UserController : DefaultController<User>
	    { 
			public UserController(IRepository<User> repo) : base(repo) {	}
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public User GetSingle(int selector, String select)
	        {
	            //return base.GetCollection(select).FirstOrDefault(y => y.UserID == selector);
	            return base.GetCollection(select).FirstOrDefault(y => y.ID == selector);
	        }
	
	        [HttpGet]
	        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)] 
	        override public User GetSingle(int selector)
	        {
	            return GetSingle(selector, null);
	        }
	
		}
	
	}
	
	
	
