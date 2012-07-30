using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Reflection;
using System.Data.Entity.Infrastructure;
using SDataRepository;

namespace DbSetRepository
{
    public class DbContextRepository<T> : IRepository<T> where T : MobileModelEntity
    {
        DbContext db;

        public DbContextRepository(DbContext initDb)
        {
            db = initDb;
        }


        public virtual T GetSingle(int selector, String select)
        {
            return GetAll(select).FirstOrDefault(y => y.ID == selector);
        }

        public IQueryable<T> GetAll(string select)
        {
            //db.Configuration.ProxyCreationEnabled = false;

            DbSet<T> set = db.Set<T>();
            IQueryable<T> retVal;

            if (string.IsNullOrEmpty(select))
            {
                retVal = set.AsQueryable<T>();
            }
            else
            {
                string[] includeFields = select.Split(',');
                if (includeFields.Length < 1)
                {
                    retVal = set.AsQueryable<T>();
                }
                else
                {
                    PropertyInfo[] props = typeof(T).GetProperties();
                    string[] fieldsToExclude = new string[props.Length];

                    for (int i = 0; i < fieldsToExclude.Length; i++)
                    {
                        fieldsToExclude[i] = props[i].Name;
                    }

                    // TO-DO : USE SELECT
                    //result.Fields = Fields.Exclude(fieldsToExclude);
                    //result.Fields = Fields.Include(includeFields);

                    retVal = set.AsQueryable<T>();
                }
            }

            return retVal;

        }

        public T GetTemplate()
        {
            T retValue;
            try
            {
                retValue = (T)typeof(T).GetConstructor(new Type[] { }).Invoke(new object[] { });
                retValue.InitializeDefaults();
            }
            catch
            {
                retValue = default(T);
            }
            return retValue;
        }

        public T Insert(T value)
        {
            db.Set<T>().Add(value);

            db.SaveChanges();

            return value;
        }

        public void Update(T oldValue, T newValue)
        {
            DbEntityEntry anEntry = db.Entry<T>(oldValue);

            anEntry.CurrentValues.SetValues(newValue);
            db.SaveChanges();

        }

        public void Delete(T entityToRemove)
        {
            db.Set<T>().Remove(entityToRemove); // Remove existing entity
            db.SaveChanges();
        }

    }
}
