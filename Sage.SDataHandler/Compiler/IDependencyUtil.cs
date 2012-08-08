using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using Microsoft.Practices.Unity;

namespace Sage.SDataHandler.Compiler
{
    public interface IDependencyUtil
    {
        UnityContainer RegisterDependencyResolver(HttpConfiguration httpConfig);
    }
}
