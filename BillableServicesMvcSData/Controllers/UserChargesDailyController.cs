using System;
using System.Linq;
using System.Web.Http;
using Sage.SDataHandler;
using BillableModel.Models;
using Sage.SData.Controllers;
using BillableModel;

namespace BillableServicesMvcSData.Controllers
{
    public class UserChargesDailyController : DefaultController<vwsUserChargesDaily>
    {
        public UserChargesDailyController() : base(new BillableServiceRepository<vwsUserChargesDaily>()) { }

        // GET api/product/5
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public override vwsUserChargesDaily GetSingle(int selector, String select, string include)
        {
            return respository.GetAll(select, include).FirstOrDefault(y => y.UserID == selector);
            //return respository.GetSingle(selector, select, include);
        }

    }
}
