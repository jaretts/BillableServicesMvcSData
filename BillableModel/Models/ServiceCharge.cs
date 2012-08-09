//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Sage.SData.Repository;
namespace BillableModel.Models
{
    [DataContract]
    public partial class ServiceCharge : SDataModelEntity
    {
        public ServiceCharge()
        {
            this.ServiceDetails = new HashSet<ServiceDetail>();
        }
    
    	[DataMember]
        public int ServiceChargeID { get; set; }
    	[DataMember]
        public int UserID { get; set; }
    	[DataMember]
        public int ProjectID { get; set; }
    	[DataMember]
        public System.DateTime ServiceDate { get; set; }
    	[DataMember]
        public int Status { get; set; }
    	[DataMember]
        public int PaymentMethod { get; set; }
    	[DataMember]
        public string Recipient { get; set; }
    	[DataMember]
        public string Note { get; set; }
    
    	[DataMember]
        public virtual ICollection<ServiceDetail> ServiceDetails { get; set; }
    }
    
}
