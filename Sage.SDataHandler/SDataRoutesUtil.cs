using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Routing;


namespace Sage.SDataHandler
{
    public class SDataRoutesUtil
    {
        public const string SDATA_ACTION_SINGLE = "SDataSingleResourceKind";
        public const string SDATA_ACTION_COLLECTION = "SDataCollection";
        public const string SDATA_ACTION_DELETE = "SDataSingleResourceKindDelete";
        public const string SDATA_ACTION_TEMPLATE = "GetTemplate";

        public static string HTTP_VERB_POST = "POST";
        public static string HTTP_VERB_PUT = "PUT";
        public static string HTTP_VERB_GET = "GET";
        public static string HTTP_VERB_DELETE = "DELETE";

        public static HttpMethodConstraint HTTP_METHOD_CRUD = new HttpMethodConstraint(new string[] { HTTP_VERB_POST, HTTP_VERB_GET, HTTP_VERB_PUT, HTTP_VERB_DELETE });
        public static HttpMethodConstraint HTTP_METHOD_POST = new HttpMethodConstraint(new string[] { HTTP_VERB_POST });
        public static HttpMethodConstraint HTTP_METHOD_GET = new HttpMethodConstraint(new string[] { HTTP_VERB_GET });
        public static HttpMethodConstraint HTTP_METHOD_PUT = new HttpMethodConstraint(new string[] { HTTP_VERB_PUT });
        public static HttpMethodConstraint HTTP_METHOD_DELETE = new HttpMethodConstraint(new string[] { HTTP_VERB_DELETE });

        private static SDataRoutesUtil theInstance;

        string currentAuthority;

        public string CurrentAuthority
        {
            get { return currentAuthority; }
            set { currentAuthority = value; }
        }

        string currentBaseUrl;

        public string CurrentBaseUrl
        {
            get { return currentBaseUrl; }
            set { currentBaseUrl = value; }
        }

        private SDataRoutesUtil()
        {
            theInstance = this;
        }

        public static SDataRoutesUtil GetInstance()
        {
            if (theInstance == null)
            {
                theInstance = new SDataRoutesUtil();
            }

            return theInstance;
        }


        public void RegisterSDataRoutes(string baseUrl, System.Web.Routing.RouteCollection routes)
        {
            if(!baseUrl.EndsWith("/"))
            {
                baseUrl += "/";
            }

            currentBaseUrl = baseUrl;

            routes.MapHttpRoute(name: "SDataSingleResourceKind",
                 routeTemplate: baseUrl + "{controller}('{selector}')/{query}",
                 defaults: new
                 {
                     query = RouteParameter.Optional,
                     action = SDATA_ACTION_SINGLE
                 });

            routes.MapHttpRoute(name: "SDataSingleResourceKind2",
                 routeTemplate: baseUrl + "{controller}({selector})/{query}",
                 defaults: new
                 {
                     query = RouteParameter.Optional,
                     action = SDATA_ACTION_SINGLE
                 });

            routes.MapHttpRoute(name: "SDataDeleteSingleResourceKind",
                 routeTemplate: baseUrl + "{controller}('{selector}')",
                 defaults: new
                 {
                     action = SDATA_ACTION_DELETE
                     //,  httpMethod = HTTP_METHOD_DELETE
                 });

            routes.MapHttpRoute(name: "SDataTemplate",
               routeTemplate: baseUrl +" {controller}/$template",
               defaults: new
               {
                   action = SDATA_ACTION_TEMPLATE,
                   httpMethod = HTTP_METHOD_GET
               }
              );

            routes.MapHttpRoute(name: "SDataCollection",
                 routeTemplate: baseUrl + "{controller}/{query}",
                 defaults: new
                 {
                     query = RouteParameter.Optional,
                     action = SDATA_ACTION_COLLECTION
                 });

        }
    }
}
