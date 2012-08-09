using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Reflection;
using Sage.SData.Repository;
using Sage.SDataHandler;

namespace Sage.SData.Controllers
{
    public class DefaultController<T> : ApiController where T : SDataModelEntity // class
    {
        public IRepository<T> respository { get; set; }

        public DefaultController(IRepository<T> respository)
        {
            this.respository = respository;
        }


        /// GET api/default
        /// Must have Queryable attribute or OData does not work
        [Queryable]
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_COLLECTION)]
        public virtual IQueryable<T> GetCollection(string select)
        {
            IQueryable<T> retVal = respository.GetAll(select);

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

            return retVal;
        }

        // GET api/product/5
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public virtual T GetSingle(int selector)
        {
            return respository.GetSingle(selector, null);
        }

        // GET api/product/5
        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public virtual T GetSingle(int selector, String select)
        {
            return respository.GetSingle(selector, select);
        }

        [HttpGet]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_TEMPLATE)]
        virtual public T GetTemplate()
        {
            return respository.GetTemplate();
        }

        // PUT api/customers/5
        [HttpPut]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_SINGLE)]
        public HttpResponseMessage Put(int selector, String select, T value)
        {
            T resourceModified = null;

            // check if it exists
            T oldValue = GetSingle(selector, select);

            if ( oldValue != null)
            {
                try
                {
                    // update it
                    respository.Update(oldValue, value);

                    // get new value
                    resourceModified = GetSingle(selector, select);
                }
                catch (Exception e)
                {
                }
            }

            HttpStatusCode retStatus;
            if(resourceModified == null)
            {
                retStatus = HttpStatusCode.NotFound;
            }
            else
            {
                retStatus = HttpStatusCode.OK;
            }

            var response = Request.CreateResponse<T>(retStatus, resourceModified);

            return response;
        }

        // POST single resource post; client sent single resource
        [HttpPost]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_COLLECTION)]
        public HttpResponseMessage Post(T value)
        {
            //T addedResource = respository.Post(value);
            HttpResponseMessage response;
            try
            {
                T addedResource = this.respository.Insert(value);

                response = Request.CreateResponse<T>(HttpStatusCode.Created, addedResource);
            }
            catch(Exception e)
            {
                response = Request.CreateResponse<T>(HttpStatusCode.NotFound, null);
            }
            return response;
        }


        [HttpDelete]
        [ActionName(SDataRoutesUtil.SDATA_ACTION_DELETE)]
        public HttpResponseMessage Delete(int selector)
        {
            HttpResponseMessage retValue;
            T oldValue = GetSingle(selector, null);


            if (oldValue == null)
            {
                retValue = Request.CreateResponse<T>(HttpStatusCode.NotFound, null);
            }
            else
            {
                this.respository.Delete(oldValue);

                retValue = Request.CreateResponse<T>(HttpStatusCode.OK, null);

            }

            return retValue;
        }


    }
}

