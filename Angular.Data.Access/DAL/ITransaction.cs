using System;
using System.Collections.Generic;
using System.Text;

namespace Angular.Data.Access.DAL
{
    public interface ITransaction : IDisposable
    {

        void Commit();
        void Rollback();
    }
}
