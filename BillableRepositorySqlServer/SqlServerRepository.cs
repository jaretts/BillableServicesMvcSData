using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SDataRepository;
using 

namespace BillableRepositorySqlServer
{
    public class SqlServerRepository<T> : IRepository<T> where T : MobileModelEntity
    {

        BillableServicesEntities db = new BillableServicesEntities();

        public IQueryable<T> GetAll()
        {
        }

        public IQueryable<T> GetAll(string select)
        {
        }

        public T GetTemplate()
        {
        }

        public T Post(T value)
        {
        }

        public T Put(String selector, T value)
        {
        }
    }
}
