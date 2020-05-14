using System;
using System.Collections.Generic;
using System.Text;
using Angular.Data.Models;

namespace Angular.Api.Models.User
{
   public class UserWithTokenModel
    {
        public string Token { get; set; }
        public Angular.Data.Models.User User { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
