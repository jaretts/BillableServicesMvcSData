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
    public partial class ServiceDetail : SDataModelEntity
    {
    	[DataMember]
        public int ServiceDetailsID { get; set; }
    	[DataMember]
        public int ServiceChargeID { get; set; }
    	[DataMember]
        public int ServiceTypeID { get; set; }
    	[DataMember]
        public double Qty { get; set; }
    	[DataMember]
        public double Rate { get; set; }
    	[DataMember]
        public string Note { get; set; }
    }
    
}
