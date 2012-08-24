using System;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Reflection;
using System.Data.Entity.Infrastructure;
using System.Data.Metadata.Edm;
using Sage.SData.Repository;
using System.Data.Objects;

namespace DbSetRepository
{
    abstract public class DbContextRepository<T> : IRepository<T> where T : SDataModelEntity
    {

        public abstract DbContext GetDatabaseContext();

        public DbContextRepository()
        {
            GetDatabaseContext().Configuration.ProxyCreationEnabled = false;
            //db.Configuration.LazyLoadingEnabled = false;
        }

        public virtual T GetSingle(int selector, string select, string include)
        {
            return GetAll(select, include).FirstOrDefault(y => y.ID == selector);
        }

        public IQueryable<T> GetAll(string select, string include)
        {

            DbSet<T> set = GetDatabaseContext().Set<T>();
            IQueryable<T> retVal;

            retVal = HandleSelect(select, set);

            retVal = HandleInclude(include, retVal);

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
            GetDatabaseContext().Set<T>().Add(value);
            GetDatabaseContext().SaveChanges();

            return value;
        }

        public void Update(T oldValue, T newValue)
        {
            DbEntityEntry anEntry = GetDatabaseContext().Entry<T>(oldValue);

            anEntry.CurrentValues.SetValues(newValue);
            GetDatabaseContext().SaveChanges();

        }

        public void Delete(T entityToRemove)
        {
            GetDatabaseContext().Set<T>().Remove(entityToRemove); // Remove existing entity
            GetDatabaseContext().SaveChanges();
        }

        public EntityType GetCSpaceEntityType<ET>(MetadataWorkspace workspace)
        {
            if (workspace == null)
                throw new ArgumentNullException("workspace");
            // Make sure the assembly for "T" is loaded 
            workspace.LoadFromAssembly(typeof(ET).Assembly);
            // Try to get the ospace type and if that is found 
            // look for the cspace type too. 
            EntityType ospaceEntityType = null;
            StructuralType cspaceEntityType = null;
            if (workspace.TryGetItem<EntityType>( typeof(ET).FullName, DataSpace.OSpace, out ospaceEntityType))
            {
                if (workspace.TryGetEdmSpaceType( ospaceEntityType, out cspaceEntityType))
                {
                    return cspaceEntityType as EntityType;
                }
            }
            return null;
        }

        private IQueryable<T> HandleInclude(string include, IQueryable<T> retVal)
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

                if (include.Equals("$children"))
                {
                    // if $children then find all navigation properties and include all
                    if (GetDatabaseContext() is IObjectContextAdapter)
                    {
                        ObjectContext obc = ((IObjectContextAdapter)GetDatabaseContext()).ObjectContext;

                        EntityType entityType = GetCSpaceEntityType<T>(obc.MetadataWorkspace);

                        if (entityType == null)
                        {
                            include = "";
                        }
                        else
                        {
                            // build an include string like 'OrderDetails,Address'
                            var props = entityType.NavigationProperties;

                            StringBuilder propsToInclude = new StringBuilder();
                            foreach (NavigationProperty aProp in props)
                            {
                                if (propsToInclude.Length != 0)
                                {
                                    propsToInclude.Append(",");
                                }
                                propsToInclude.Append(aProp.Name);
                            }

                            include = propsToInclude.ToString();
                        }
                    }
                }

                // if there's an include then expand the navigation properties
                if (!string.IsNullOrEmpty(include))
                {
                    if (include.Contains(","))
                    {
                        // multiple includes
                        string[] includes = include.Split(',');

                        foreach (string anInclude in includes)
                        {
                            retVal = retVal.Include(anInclude);
                        }

                    }
                    else
                    {
                        retVal = retVal.Include(include);
                    }

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

    }
}
