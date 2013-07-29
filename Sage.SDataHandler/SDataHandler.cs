using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Thinktecture.IdentityModel.Tokens.Http;
using System.Web.Http;
using System.Web.Http.Dispatcher;

namespace Sage.SDataHandler
{
    public class SDataHandler : DelegatingHandler //AuthenticationHandler
    {
        /*
        public SDataHandler() : base( CreateConfiguration() ) {}

        public static AuthenticationConfiguration CreateConfiguration()
        {
            var config = new AuthenticationConfiguration
            {
                DefaultAuthenticationScheme = "Basic",
            };

            #region Basic Authentication
            config.AddBasicAuthentication((userName, password) => userName == password);
            #endregion

            return config;
        }
        */


        public SDataHandler(HttpConfiguration httpConfiguration)
        {
            InnerHandler = new HttpControllerDispatcher(httpConfiguration);
        }

        public SDataHandler()
        {
        }

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {

            Uri originalUri = request.RequestUri;

            // check if a param like format=json was in original uri and set Accept header
            //SDataUriUtil.SetAcceptJsonHeader(request, originalUri);

            // convert any SData query keys (where, startIndex, etc.) 
            Uri newUri = SDataUriUtil.TranslateUri(originalUri, SDataUriKeys.CONVERT_TO_ODATA);

            request.RequestUri = newUri;

            /* if (HttpContext.Current.Request["code"] != null)
                _authenticator.LoadAccessToken();*/

            return base.SendAsync(request, cancellationToken).ContinueWith(
                (task) =>
                {
                    HttpResponseMessage response = task.Result;

                    if (ResponseIsValid(response))
                    {
                        object responseObject;
                        if (!String.Equals(originalUri.Query, newUri.Query))
                        {
                            response.RequestMessage.RequestUri = originalUri;
                        }

                        response.TryGetContentValue(out responseObject);

                        if (responseObject is IQueryable)
                        {
                            ProcessObject<object>(responseObject as IQueryable<object>, response, true);
                        }
                        else
                        {
                            /* Disable this logic for now; only metadata returned will be in model
                            var list = new List<object>();
                            list.Add(responseObject);
                            ProcessObject<object>(responseObject as IEnumerable<object>, response, false);
                             */
                            response.Content = new ObjectContent<object>( responseObject, System.Web.Http.GlobalConfiguration.Configuration.Formatters[0]);

                        }
                    }

                    return response;
                }
            );
        }

        private void ProcessObject<T>(IEnumerable<T> responseObject, HttpResponseMessage response, bool isIQueryable) where T : class
        {
            if (isIQueryable)
            {
                var metadata = new SDataCollectionMetadata<T>(response, isIQueryable);
                response.Content = new ObjectContent<SDataCollectionMetadata<T>>(metadata, System.Web.Http.GlobalConfiguration.Configuration.Formatters[0]);
            }
            else
            {
                var metadata = new SDataResourceMetadata<T>(response, isIQueryable);
                response.Content = new ObjectContent<SDataResourceMetadata<T>>(metadata, System.Web.Http.GlobalConfiguration.Configuration.Formatters[0]);
            }
             
            //uncomment this to preserve content negotation, but remember about typecasting for DataContractSerliaizer
            //var formatter = GlobalConfiguration.Configuration.Formatters.First(t => t.SupportedMediaTypes.Contains(new MediaTypeHeaderValue(response.Content.Headers.ContentType.MediaType)));
            //response.Content = new ObjectContent<Metadata<T>>(metadata, formatter);
        }

        private bool ResponseIsValid(HttpResponseMessage response)
        {
            if (response.StatusCode != HttpStatusCode.OK && response.StatusCode != HttpStatusCode.Created)
            {
                return false;
            }

            if (response == null || !(response.Content is ObjectContent))
            {
                return false;
            }
            
            return true;
        }

        }

}