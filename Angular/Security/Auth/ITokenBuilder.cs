using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.Security.Auth
{
   public interface ITokenBuilder
    {
        string Build(string name , DateTime expireDate);

    }
}
