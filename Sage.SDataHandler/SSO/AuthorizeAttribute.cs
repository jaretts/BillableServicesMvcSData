using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web;

namespace Sage.SDataHandler.SSO
{
    public class AuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {
        /*
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return SSOSession.Refresh();
        }*/

        public override void OnAuthorization(HttpActionContext httpActionContext)
        {
            // This is a simple check to see if there is an SSOSession object
            // in the application session. It is used later on to determine if
            // a "your session has ended" message should be displayed to the
            // user.
            bool hadSession = HttpContext.Current.Session["SSOSession"] != null;

            // If authorization is denied then the base method will invoke
            // HandleUnauthorizedRequest to process the unauthorized request
            base.OnAuthorization(httpActionContext);

            // TODO confirm behaviour of base OnAuthorization method confirm if get
            // to this point user is ok according to base method;
            if (hadSession)
            {
                    //filterContext.Result = new System.Web.Mvc.RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary() { { "controller", "Home" }, { "action", "SignIn" }, { "sessionEnded", "true" } });
            }
            else
            {
                    //filterContext.Result = new System.Web.Mvc.RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary() { { "controller", "Home" }, { "action", "SignIn" } });
            }
            
        }
    }
}
