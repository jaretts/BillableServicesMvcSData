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
    public partial class User : MobileModelEntity
    {
    	[DataMember]
        public int UserID { get; set; }
    	[DataMember]
        public string UserName { get; set; }
    	[DataMember]
        public int TenantID { get; set; }
    	[DataMember]
        public string EmailAddress { get; set; }
    	[DataMember]
        public string Phone { get; set; }
    	[DataMember]
        public string Title { get; set; }
    	[DataMember]
        public int Performance { get; set; }
    }
    
}
