using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace Sage.SData.Repository
{
    [DataContract]
    public abstract class  SDataModelEntity
    {
        [DataMember(Name = "$url")]
        public String relativeUrl
        {
            get
            {
                return this.GetType().Name + "('" + this.ID + "')";
            }
        }

        [DataMember(Name = "$descriptor")]
        public String descriptor
        {
            get
            {
                return this.GetType().Name + "('" + this.ID + "')";
            }
        }


        virtual public void InitializeDefaults() { }

        [DataMember(Name = "$key")]
        public int ID { get; set; }

            
    }
}
