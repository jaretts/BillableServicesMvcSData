using System;
using System.Linq;
using System.Web.Http;
using Sage.SDataHandler;
using BillableModel.Models;
using Sage.SData.Controllers;
using BillableModel;
using System.Net.Http;
using System.Net;
using System.Data.Entity.Infrastructure;

namespace BillableServicesMvcSData.Controllers
{
    public class ProjectsController : DefaultController<vwsProject>
    {
        public ProjectsController() : base(new BillableServiceRepository<vwsProject>()) { }

        // GET api/product/5
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public override vwsProject GetSingle(int selector, String select, string include)
        {
            return GetCollection(select, include).FirstOrDefault(y => y.ProjectID == selector);
        }

        [Queryable]
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_COLLECTION)]
        public override IQueryable<vwsProject> GetCollection(string select, string include)
        {

            if (!String.IsNullOrEmpty(select) && select.Contains("Customer/") 
                && String.IsNullOrEmpty(include))
            {
                // add Customer include because selecting an attribute of child
                include = "Customer";
            }

            IQueryable<vwsProject> retVal;
            if (String.IsNullOrEmpty(include))
            {
                retVal = base.GetCollection(select, include);
            }
            else
            {
                using (BillableServicesEntities bsc = new BillableServicesEntities())
                {
                    bsc.Configuration.ProxyCreationEnabled = false;
                    vwsProject[] allProjects = bsc.vwsProjects.ToArray<vwsProject>();

                    string[] includes = include.Split(',');

                    foreach (string anInclude in includes)
                    {
                        switch (anInclude)
                        {
                            case "Customer":
                                foreach (vwsProject project in allProjects)
                                {
                                    Customer customerForPrj = bsc.Customers.First(c => c.CustomerID == project.CustomerID);
                                    project.Customer = customerForPrj;
                                }
                                break;
                        }
                    }

                    retVal = allProjects.AsQueryable<vwsProject>();

                }
            }
            return retVal;
        }


        [HttpPut]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public override HttpResponseMessage Put(int selector, String select, vwsProject newValue)
        {

            vwsProject resourceModified = null;

            using (BillableServicesEntities bsc = new BillableServicesEntities())
            {
                bsc.Configuration.ProxyCreationEnabled = false;
                // check if it exists

                Project oldValue = bsc.Projects.FirstOrDefault(y => y.ProjectID == selector);
                DbEntityEntry<Project> anEntry = bsc.Entry<Project>(oldValue);

                if (oldValue != null)
                {
                    try
                    {
                        string[] selects = select.Split(',');

                        foreach (string anSelect in selects)
                        {
                            switch (anSelect.ToLower())
                            {
                                case "projectdescription":
                                    //oldValue.ProjectDescription = newValue.ProjectDescription;
                                    bsc.Entry<Project>(oldValue).Property(p => p.ProjectDescription)
                                                .CurrentValue = newValue.ProjectDescription;

                                    break;
                                case "budget":
                                    //oldValue.Budget = newValue.Budget;
                                    bsc.Entry<Project>(oldValue).Property(p => p.Budget)
                                        .CurrentValue = newValue.Budget;

                                    break;
                            }
                        }

                      //  anEntry.CurrentValues.SetValues(oldValue);
                        
                        // update it
                        anEntry.State = System.Data.EntityState.Modified;

                        bsc.SaveChanges();

                        resourceModified = GetSingle(selector, String.Empty, String.Empty);
                        // get new value
                        //resourceModified = GetSingle(selector, select, null);
                    }
                    catch (Exception e)
                    {
                    }
                }

            }


            HttpStatusCode retStatus;
            if (resourceModified == null)
            {
                retStatus = HttpStatusCode.NotFound;
            }
            else
            {
                retStatus = HttpStatusCode.OK;
            }

            var response = Request.CreateResponse<vwsProject>(retStatus, resourceModified);

            return response;
        }

    }
}
