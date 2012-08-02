using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;

namespace Sage.SDataHandler.Compiler
{
    public interface IDependencyUtil
    {
        void RegisterDependencyResolver(HttpConfiguration httpConfig);
    }
}
