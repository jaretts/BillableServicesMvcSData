using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Sage.SDataHandler;
using Sage.SData.Controllers;
using Sage.SData.Repository;

namespace BillableServicesMvcSData.Controllers
{
    public class CustomerController : DefaultController<BillableModel.Models.Customer>
    {
        public CustomerController() : base(new DbSetRepository.DbContextRepository<BillableModel.Models.Customer>()) { }


        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_COLLECTION)]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
