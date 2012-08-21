using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Sage.SDataHandler;
using BillableModel.Models;
using System.Data.Entity;

namespace BillableServicesMvcSData.Controllers
{
    public class MyServiceChargeController : ApiController
    {
        DbContext db = new BillableServicesEntities();


        [Queryable]
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_COLLECTION)]
        public virtual IQueryable<ServiceCharge> GetCollection(string select, string include)
        {
            db.Configuration.ProxyCreationEnabled = false;
            //db.Configuration.LazyLoadingEnabled = false;

            DbSet<ServiceCharge> set = db.Set<ServiceCharge>();
            IQueryable<ServiceCharge> retVal = set.AsQueryable<ServiceCharge>();

            if (retVal == null)
            {
                // should have something now 
                throw new HttpResponseException(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.NotFound,
                    Content = new StringContent("Resource not found"),
                    ReasonPhrase = "Resource not found"
                });
            }


            if (!string.IsNullOrEmpty(include))
            {
                include = include.Trim();
                if(include.StartsWith("'"))
                {
                    include = include.Remove(0, 1);
                }
                if (include.EndsWith("'"))
                {
                    include = include.Remove( include.Length - 1, 1 );
                }

                if (!string.IsNullOrEmpty(include))
                {
                    retVal = retVal.Include(include);
                }

            }

            return retVal;
        }

        // GET api/product/5
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public virtual ServiceCharge GetSingle(int selector)
        {
            DbSet<ServiceCharge> set = db.Set<ServiceCharge>();

            return GetCollection(null, null).FirstOrDefault(y => y.ServiceChargeID == selector);
        }

    }
}
