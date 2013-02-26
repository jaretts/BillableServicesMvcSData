using System;
using System.Configuration;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Web;
using System.Web.Caching;
//using System.Web.Mvc;
using System.Xml;

using Sage.Obsidian.Client.Support;
using SageSSO.ServiceReferences;
using SSOSchema = Sage.Obsidian.Shared.Schema;
using System.Collections.Generic;
using System.Web.Http;
using System.Net.Http;
using System.Net;

//namespace WebApplication.Controllers
namespace Sage.SDataHandler.SSO.Controllers
{
    public partial class SSOController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage SignOnInit()
        {
            StartSignOnAttemptResponse response = null;

            using (WebSSOServiceSoapClient client = new WebSSOServiceSoapClient("WebSSOServiceSoapClient"))
            {
                client.Open();

                StartSignOnAttemptRequest request = new StartSignOnAttemptRequest()
                {
                    SuccessUri = SignOnSuccessUri,
                    FailureUri = SignOnFailUri,
                    CancelAllowed = true, 
                    SessionLengthMinutes = Session.Timeout,
                    SessionLengthMinutesSpecified = true
                };

                try
                {
                    response = client.StartSignOnAttempt(request);
                }
                catch (Exception ex)
                {
                    Session["Message"] = HttpUtility.HtmlEncode(string.Format("Exception of type {0} raised when calling WebSSOService.StartSignOnAttempt(). {1}", ex.GetType().FullName, ex.Message));

                    return SignInPageRedirect;
                }
            }

            // The sign-on attempt ID is placed in the session to act as a "marker" that
            // a sign-on attempt is in progress. It's used later to avoid a call to
            // EndSignOnAttempt() if no sign-on attempt is in progress.

            Session["SignOnAttempt"] = response.SignOnAttemptId;

           // return Redirect(response.RedirectUri);

            var redirectResponse = Request.CreateResponse(HttpStatusCode.Redirect); //.Moved);
            response.Headers.Location = new Uri(response.RedirectUri);
            return redirectResponse;
        }

        [HttpGet]
        public HttpResponseMessage SignOnSuccessful(string resultId)
        {
            // Don't do any processing if an attempt was not
            // in progress.
            if (Session["SignOnAttempt"] != null)
            {
                Session["SignOnAttempt"] = null;

                Guid resultIdGuid = Guid.Empty;

                try
                {
                    resultIdGuid = new Guid(resultId);
                }
                catch (Exception)
                {
                    // Ignore failure to parse GUID
                }

                // Don't do any processing if the id parameter is not
                // a valid, non-zero GUID.
                if (resultIdGuid != Guid.Empty)
                {
                    try
                    {
                        using (var client = new WebSSOServiceSoapClient("WebSSOServiceSoapClient"))
                        {
                            EndSignOnAttemptRequest request = new EndSignOnAttemptRequest();
                            request.ResultId = resultIdGuid;

                            // Make a web service call to retrieve the result of the
                            // sign-on attempt.
                            EndSignOnAttemptResponse response = client.EndSignOnAttempt(request);

                            SuccessResult result = (SuccessResult)response.Item;

                            // Extract the user identity ID from the authentication token. This code
                            // extract shows how to do this using XQuery:

                            XmlDocument authenticationToken = new XmlDocument();
                            authenticationToken.LoadXml(Encoding.UTF8.GetString(Convert.FromBase64String(result.UserAuthenticationToken)));

                            XmlNamespaceManager nsMgr = new XmlNamespaceManager(authenticationToken.NameTable);
                            nsMgr.AddNamespace("sso", "http://sso.sage.com");

                            Guid userIdentityId = new Guid(authenticationToken.SelectSingleNode("sso:AuthenticationToken/sso:Subject/sso:UserPrincipal/sso:Id", nsMgr).InnerText);

                            // This code shows how to do the same with the optional .NET SSO client
                            // support library:

                            //SSOSchema.AuthenticationToken authenticationToken = Base64Helper<SSOSchema.AuthenticationToken>.FromBase64Xml(result.UserAuthenticationToken);
                            //Guid userIdentityId = (authenticationToken.Subject.Item as SageSSOSchema.UserPrincipal).Id;

                            // As of Sage ID 1.2, the user IdentityId is available without having to decode the UserAuthenticationToken
                            // userIdentityId = result.IdentityId;

                            SSOSession.Start(result.SessionId,
                                             result.SessionExpiry,
                                             result.EmailAddress,
                                             result.DisplayName,
                                             result.IdentityId,
                                             response.Culture,
                                             result.UserAuthenticationToken);
                        }
                    }
                    catch (Exception ex)
                    {
                        Session["Message"] = string.Format("Exception of type {0} raised when calling WebSSOService.EndSignOnAttempt(). {1}", ex.GetType().FullName, ex.Message);
                    }
                }
            }

            if (SSOSession.HasSession)
            {
                return AppPageRedirect;
            }
            else
            {
                return SignInPageRedirect;
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult SignOnFailed(string resultId)
        {
            // Don't do any processing if an attempt was not
            // in progress.
            if (Session["SignOnAttempt"] != null)
            {
                Session["SignOnAttempt"] = null;

                Guid resultIdGuid = Guid.Empty;

                try
                {
                    resultIdGuid = new Guid(resultId);
                }
                catch (Exception)
                {
                    // Ignore failure to parse GUID
                }

                // Don't do any processing if the id parameter is not
                // a valid, non-zero GUID.
                if (resultIdGuid != Guid.Empty)
                {
                    try
                    {
                        using (var client = new WebSSOServiceSoapClient("WebSSOServiceSoapClient"))
                        {
                            EndSignOnAttemptRequest request = new EndSignOnAttemptRequest();
                            request.ResultId = resultIdGuid;

                            // Make a web service call to SSO to retrieve the result of the
                            // sign-on attempt.
                            EndSignOnAttemptResponse response = client.EndSignOnAttempt(request);

                            FailedResult result = (FailedResult)response.Item;

                            switch (result.Reason)
                            {
                                case FailureReason.SignOnCancelled:
                                    // The user clicked the cancel button. No message necessary.
                                    break;
                                case FailureReason.AccountPasswordReset:
                                    // Note that we DON'T recommend that the activation link is
                                    // displayed to the user. It is displayed here to facilitate testing.
                                    Session["Message"] = string.Format("Password recovery successful. An activation email was sent which includes the following activation link: {0}. ({1})",
                                                                       result.ActivationLinkUri,
                                                                       result.Reason.ToString());
                                    break;
                                case FailureReason.ValidationFailed:
                                    Session["Message"] = string.Format("Password recovery unsuccessful. ({0})",
                                                                       result.Reason.ToString());
                                    break;
                                case FailureReason.AccountBlocked:
                                    Session["Message"] = string.Format("Account has been blocked for this application. ({0}) {1}{2}{3}",
                                                                       result.Reason.ToString(),
                                                                       result.IdentityIdSpecified ? " IdentityId=" + result.IdentityId.ToString() : string.Empty,
                                                                       !String.IsNullOrEmpty(result.DisplayName) ? ", DisplayName=" + result.DisplayName : string.Empty,
                                                                       !String.IsNullOrEmpty(result.EmailAddress) ? ", EmailAddress=" + result.EmailAddress : string.Empty);
                                    break;
                                case FailureReason.AccountExpired:
                                    Session["Message"] = string.Format("Account has expired. ({0}) {1}{2}{3}",
                                                                       result.Reason.ToString(),
                                                                       result.IdentityIdSpecified ? " IdentityId=" + result.IdentityId.ToString() : string.Empty,
                                                                       !String.IsNullOrEmpty(result.DisplayName) ? ", DisplayName=" + result.DisplayName : string.Empty,
                                                                       !String.IsNullOrEmpty(result.EmailAddress) ? ", EmailAddress=" + result.EmailAddress : string.Empty);
                                    break;
                                case FailureReason.AccountHardLocked:
                                    Session["Message"] = string.Format("Account has been hard locked and must be unlocked by an administrator. ({0}) {1}{2}{3}",
                                                                       result.Reason.ToString(),
                                                                       result.IdentityIdSpecified ? " IdentityId=" + result.IdentityId.ToString() : string.Empty,
                                                                       !String.IsNullOrEmpty(result.DisplayName) ? ", DisplayName=" + result.DisplayName : string.Empty,
                                                                       !String.IsNullOrEmpty(result.EmailAddress) ? ", EmailAddress=" + result.EmailAddress : string.Empty);
                                    break;
                                case FailureReason.AccountSoftLocked:
                                    Session["Message"] = string.Format("Account has been temporarily locked. ({0}) {1}{2}{3}",
                                                                       result.Reason.ToString(),
                                                                       result.IdentityIdSpecified ? " IdentityId=" + result.IdentityId.ToString() : string.Empty,
                                                                       !String.IsNullOrEmpty(result.DisplayName) ? ", DisplayName=" + result.DisplayName : string.Empty,
                                                                       !String.IsNullOrEmpty(result.EmailAddress) ? ", EmailAddress=" + result.EmailAddress : string.Empty);
                                    break;
                                case FailureReason.AccountNotActivated:
                                    Session["Message"] = string.Format("Account is not activated. ({0}) {1}{2}{3}",
                                                                       result.Reason.ToString(),
                                                                       result.IdentityIdSpecified ? " IdentityId=" + result.IdentityId.ToString() : string.Empty,
                                                                       !String.IsNullOrEmpty(result.DisplayName) ? ", DisplayName=" + result.DisplayName : string.Empty,
                                                                       !String.IsNullOrEmpty(result.EmailAddress) ? ", EmailAddress=" + result.EmailAddress : string.Empty);
                                    break;
                                case FailureReason.AccountNotRegistered:
                                    Session["Message"] = string.Format("Account exists but is not registered for this application. ({0}) {1}{2}{3}",
                                                                       result.Reason.ToString(),
                                                                       result.IdentityIdSpecified ? " IdentityId=" + result.IdentityId.ToString() : string.Empty,
                                                                       !String.IsNullOrEmpty(result.DisplayName) ? ", DisplayName=" + result.DisplayName : string.Empty,
                                                                       !String.IsNullOrEmpty(result.EmailAddress) ? ", EmailAddress=" + result.EmailAddress : string.Empty);
                                    break;
                                case FailureReason.SessionExpired:
                                    Session["Message"] = string.Format("The sign-in page expired. ({0})", result.Reason.ToString());
                                    break;
                                case FailureReason.UnknownAccount:
                                case FailureReason.ProtocolViolation:
                                case FailureReason.SignOnAttemptNotFound:
                                    Session["Message"] = string.Format("An error occured during sign-in. ({0})", result.Reason.ToString());
                                    break;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Session["Message"] = string.Format("Exception of type {0} raised when calling WebSSOService.EndSignOnAttempt(). {1}", ex.GetType().FullName, ex.Message);
                    }
                }
            }

            if (SSOSession.HasSession)
            {
                return AppPageRedirect;
            }
            else
            {
                return SignInPageRedirect;
            }
        }
    }
}
