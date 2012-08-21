﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Reflection;
using System.Data.Entity.Infrastructure;
using Sage.SData.Repository;
using BillableModel.Models;

namespace DbSetRepository
{
    public class DbContextRepository<T> : IRepository<T> where T : SDataModelEntity
    {
        DbContext db;

        public DbContextRepository()
        {
            db = new BillableServicesEntities();
            db.Configuration.ProxyCreationEnabled = false;
            //db.Configuration.LazyLoadingEnabled = false;

        }

        public virtual T GetSingle(int selector, string select, string include)
        {
            return GetAll(select, include).FirstOrDefault(y => y.ID == selector);
        }

        public IQueryable<T> GetAll(string select, string include)
        {

            DbSet<T> set = db.Set<T>();
            IQueryable<T> retVal;

            retVal = HandleSelect(select, set);

            retVal = HandleInclude(include, retVal);

            return retVal;

        }

        private static IQueryable<T> HandleInclude(string include, IQueryable<T> retVal)
        {
            if (!string.IsNullOrEmpty(include))
            {
                include = include.Trim();
                if (include.StartsWith("'"))
                {
                    include = include.Remove(0, 1);
                }
                if (include.EndsWith("'"))
                {
                    include = include.Remove(include.Length - 1, 1);
                }

                if (!string.IsNullOrEmpty(include))
                {
                    retVal = retVal.Include(include);
                }
            }

            return retVal;
        }

        private static IQueryable<T> HandleSelect(string select, DbSet<T> set)
        {
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
