using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SDataRepository
{
    public interface IRepository<T> where T : MobileModelEntity // class
    {
        T GetSingle(int selector, String select);

        IQueryable<T> GetAll(string select);

        T GetTemplate();

        T Insert(T value);

        void Update(T oldValue, T NewValue);

        void Delete(T entityToRemove);

    }
}
