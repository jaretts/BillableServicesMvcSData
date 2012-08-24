using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DbSetRepository;
using Sage.SData.Repository;
using BillableModel.Models;
using System.Data.Entity;

namespace BillableModel
{
    public class BillableServiceRepository<T> : DbContextRepository<T> where T : SDataModelEntity
    {
        DbContext db = new BillableServicesEntities();

        override public DbContext GetDatabaseContext()
        {
            return db;
        }
    }
}
