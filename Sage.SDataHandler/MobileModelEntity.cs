using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace SDataRepository
{
    [DataContract]
    public abstract class  MobileModelEntity
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
