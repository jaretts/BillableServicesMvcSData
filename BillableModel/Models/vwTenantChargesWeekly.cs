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
    public partial class vwTenantChargesWeekly : MobileModelEntity
    {
    	[DataMember]
        public int TenantID { get; set; }
    	[DataMember]
        public int PaymentMethod { get; set; }
    	[DataMember]
        public Nullable<System.DateTime> ServiceDate { get; set; }
    	[DataMember]
        public Nullable<double> Amount { get; set; }
    }
    
}
