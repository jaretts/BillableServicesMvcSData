using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Sage.SData.Repository;
using Sage.SDataHandler;
using BillableModel.Models;
using Sage.SData.Controllers;
using BillableModel;
using System.Web;
using System.Collections.Specialized;

namespace BillableServicesMvcSData.Controllers
{
    public class ServiceChargesController : DefaultController<vwsServiceCharge>
    {
        public ServiceChargesController() : base(new BillableServiceRepository<vwsServiceCharge>()) { }

        // GET api/product/5 
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public override vwsServiceCharge GetSingle(int selector, String select, string include)
        {
            return GetCollection(select, include).FirstOrDefault(y => y.ServiceChargeID == selector);
            //return respository.GetSingle(selector, select, include);
        }


        [Queryable]
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_COLLECTION)]
        public override IQueryable<vwsServiceCharge> GetCollection(string select, string include)
        {
            IQueryable<vwsServiceCharge> retVal;
            if (String.IsNullOrEmpty(include) && String.IsNullOrEmpty(select))
            {
                retVal = base.GetCollection(select, include);
            }
            else
            {
                if (String.IsNullOrEmpty(include))
                {
                    include = "";
                }

                if (include.StartsWith("'"))
                {
                    include = include.Substring(1);
                }
                if (include.EndsWith("'"))
                {
                    include = include.Substring(0, include.Length - 1);
                }

                if (include.ToLower().Equals("$children"))
                {
                    include = "details,project,customer";
                }
                else if(!String.IsNullOrEmpty(select))
                {
                    include = AddInclude(select, include, "project");
                    include = AddInclude(select, include, "customer");
                    include = AddInclude(select, include, "details");
                }

                using (BillableServicesEntities bsc = new BillableServicesEntities())
                {
                    bsc.Configuration.ProxyCreationEnabled = false;
                    vwsServiceCharge[] allSrvCharges = bsc.vwsServiceCharges.ToArray<vwsServiceCharge>();

                    string[] includes = include.Split(',');
                    foreach (vwsServiceCharge aCharge in allSrvCharges)
                    {
                        // iterate each charge and then look for fields to expand
                        foreach (string anInclude in includes)
                        {
                            string cleanInclude = anInclude.Trim().ToLower(); 

                            switch (cleanInclude)
                            {
                                case "details":
                                        IQueryable<ServiceDetail> detailsForCharge = bsc.ServiceDetails.Where(s => s.ServiceChargeID == aCharge.ServiceChargeID);

                                        if (detailsForCharge != null)
                                        {
                                            aCharge.Details = detailsForCharge.ToList<ServiceDetail>();
                                        }
                                    break;
                                case "project":
                                        vwsProject project = bsc.vwsProjects.First<vwsProject>(p => p.ProjectID == aCharge.ProjectID);

                                        if (project != null)
                                        {
                                            aCharge.Project = project;
                                        }

                                    break;
                                case "customer":
                                    Customer customer = bsc.Customers.First(c => c.CustomerID == aCharge.CustomerID);

                                    if (customer != null)
                                    {
                                        aCharge.Customer = customer;
                                    }

                                    break;
                            }
                        }
                    }

                    retVal = allSrvCharges.AsQueryable<vwsServiceCharge>();
                }
            }

            return retVal;
        }

        private static string AddInclude(string select, string include, string propertyName)
        {
            if (select.ToLower().Contains(propertyName +"/"))
            {
                // selects are treated as includes in current billable provider

                if (String.IsNullOrEmpty(include))
                {
                    include = propertyName;
                }
                else
                {
                    include += "," + propertyName;
                }
            }
            return include;
        }
    }
}
