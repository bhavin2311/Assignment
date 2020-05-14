using Angular.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.Security
{
    public interface ISecurityContext
    {
        User user { get; }


    }
}
