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
using SDataRepository;

namespace BillableModel.Models
{
    [DataContract]
    public partial class vwBillingDetailIndex : MobileModelEntity
    {
    	[DataMember]
        public int ServiceDetailsID { get; set; }
    	[DataMember]
        public string BillingDetailNo { get; set; }
    	[DataMember]
        public string CustomerName { get; set; }
    	[DataMember]
        public string DetailStatus { get; set; }
    	[DataMember]
        public double Amount { get; set; }
    	[DataMember]
        public int Status { get; set; }
    	[DataMember]
        public int TenantID { get; set; }
    }
    
}
