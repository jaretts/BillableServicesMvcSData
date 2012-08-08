using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Sage.SDataHandler;

namespace BillableServicesMvcSData.Controllers
{
    public class CustomerController : ApiController
    {
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_COLLECTION)]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

    }
}
