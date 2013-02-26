using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Web;
using System.Web.Caching;
using System.Xml;

using Sage.Obsidian.Client.Support;
using SageSSO.ServiceReferences;
using SSOSchema = Sage.Obsidian.Shared.Schema;
using System.Web.Http;

namespace Sage.SDataHandler.SSO.Controllers
{
    public partial class SSOController : ApiController
    {
        private string SignOnSuccessUri
        {
            get
            {
                string uri = ConfigurationManager.AppSettings["SignOnSuccessUri"];

                if (!String.IsNullOrEmpty(uri))
                {
                    return uri;
                }
                else
                {
                    return string.Format("{0}/{{0}}", Url.RouteUrl("SignOnSuccess", null, "http"));
                }
            }
        }

        private string SignOnFailUri
        {
            get
            {
                string uri = ConfigurationManager.AppSettings["SignOnFailUri"];

                if (!String.IsNullOrEmpty(uri))
                {
                    return uri;
                }
                else
                {
                    return string.Format("{0}/{{0}}", Url.RouteUrl("SignOnFail", null, "http"));
                }
            }
        }

        private string ChangePasswordResultUri
        {
            get
            {
                string uri = ConfigurationManager.AppSettings["ChangePasswordResultUri"];

                if (!String.IsNullOrEmpty(uri))
                {
                    return uri;
                }
                else
                {
                    return string.Format("{0}/{{0}}", Url.RouteUrl("ChangePasswordResult", null, "http"));
                }
            }
        }

        private string ManageAuthorisationsResultUri
        {
            get
            {
                string uri = ConfigurationManager.AppSettings["ManageAuthorisationsResultUri"];

                if (!String.IsNullOrEmpty(uri))
                {
                    return uri;
                }
                else
                {
                    return string.Format("{0}/{{0}}", Url.RouteUrl("ManageAuthorisationsResult", null, "http"));
                }
            }
        }

        private string RegisterNewResultUri
        {
            get
            {
                string uri = ConfigurationManager.AppSettings["RegisterNewResultUri"];

                if (!String.IsNullOrEmpty(uri))
                {
                    return uri;
                }
                else
                {
                    return string.Format("{0}/{{0}}", Url.RouteUrl("RegisterNewResult", null, "http"));
                }
            }
        }

        private string RegisterExistingResultUri
        {
            get
            {
                string uri = ConfigurationManager.AppSettings["RegisterExistingResultUri"];

                if (!String.IsNullOrEmpty(uri))
                {
                    return uri;
                }
                else
                {
                    return string.Format("{0}/{{0}}", Url.RouteUrl("RegisterExistingResult", null, "http"));
                }
            }
        }

        private ActionResult AppPageRedirect
        {
            get
            {
                return RedirectToAction("App", "Home");
            }
        }

        private ActionResult SignInPageRedirect
        {
            get
            {
                return RedirectToAction("SignIn", "Home");
            }
        }

        private ActionResult SignInPageSessionEndedRedirect
        {
            get
            {
                return RedirectToAction("SignIn", "Home", new { sessionEnded = "true" });
            }
        }

        private ActionResult SignUpPageRedirect
        {
            get
            {
                return RedirectToAction("SignUp", "Home");
            }
        }

        private X509Certificate2 SSORootCertificate
        {
            get
            {
                if (_ssoRootCertificate == null)
                {
                    X509FindType findType = (X509FindType)Enum.Parse(typeof(X509FindType), ConfigurationManager.AppSettings["SSORootCertificateFindType"], true);
                    string findValue = ConfigurationManager.AppSettings["SSORootCertificateFindValue"];

                    X509Store certStore = new X509Store(StoreName.Root, StoreLocation.LocalMachine);
                    certStore.Open(OpenFlags.OpenExistingOnly | OpenFlags.ReadOnly);

                    try
                    {
                        _ssoRootCertificate = certStore.Certificates.Find(findType, findValue, true)[0];
                    }
                    finally
                    {
                        certStore.Close();
                    }
                }

                return _ssoRootCertificate;
            }
        }

        private X509Certificate2 _ssoRootCertificate = null;

        private const int MaxNotificationSize = 0x2000;

        private const string CachedIdFormat = "NotificationId_{0}";
    }
}
