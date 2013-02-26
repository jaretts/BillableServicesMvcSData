using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Sage.SData.Repository
{
    [DataContract]
    public abstract class  SDataModelEntity
    {
        [DataMember(Name = "$httpStatus")]
        public String httpStatus
        {
            get
            {
                return HttpContext.Current.Response.Status;
                //return this.GetType().Name + "('" + this.ID + "')";
            }
        }

        [DataMember(Name = "$url")]
        public String relativeUrl
        {
            get
            {
                Uri ruri = HttpContext.Current.Request.Url;
                string urlval = ruri.Scheme + "://" + ruri.Authority + ruri.LocalPath;

                string identifier = "('" + ID + "')";
                string identifierWithoutTick = "(" + ID + ")";
                if (!urlval.EndsWith(identifier) && !urlval.EndsWith(identifierWithoutTick))
                    urlval += identifier;

                return urlval;
                //return this.GetType().Name + "('" + this.ID + "')";
            }
        }

        [DataMember(Name = "$descriptor")]
        public virtual String descriptor
        {
            get
            {
                return this.GetType().Name + "('" + ID + "')";
            }
        }


        virtual public void InitializeDefaults() { }

        [DataMember(Name = "$key")]
        public virtual int ID { get { return 1;} }

            
    }
}
