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
    public partial class BillingSchedule : MobileModelEntity
    {
    	[DataMember]
        public int BillingScheduleID { get; set; }
    	[DataMember]
        public string BillingDate { get; set; }
    	[DataMember]
        public Nullable<int> CustomerID { get; set; }
    	[DataMember]
        public Nullable<double> Amount { get; set; }
    }
    
}
