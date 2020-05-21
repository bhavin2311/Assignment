using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Angular.Api.Models;
using Angular.Api.Models.Account;
using Angular.Data.Access.DAL;
using Angular.Data.Models;
using Angular.Api.Models.User;
using Microsoft.EntityFrameworkCore;
using Angular.Security.Auth;
using Angular.Security;
using Angular.Filters;
using Microsoft.AspNetCore.Authorization;

namespace Angular.RestAPI
{
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : Controller
    {
        private readonly ISecurityContext _securityContext;

        private readonly IUnitOfWork _uow;
        private readonly ITokenBuilder _tokenBuilder;
        public AccountController(IUnitOfWork uow , ITokenBuilder tokenBuilder,ISecurityContext  securityContext)
        {
            _uow = uow;
            _tokenBuilder = tokenBuilder;
            _securityContext = securityContext;
        }
        
        [HttpPost("[action]")]
        public async Task<string> Register([FromBody] RegisterModel model)
        {
            var username = model.UserName.Trim();

            if (_uow.Query<User>().Any(u => u.UserName == username))
            {
                throw new NotFoundException("User Not Found");
            }
            var user = new User
            {
                UserName = model.UserName.Trim(),
                PassWord = model.PassWord.Trim().WithBCrypt(),
                FirstName = model.FirstName.Trim(),
                LastName = model.LastName.Trim(),
            };

            _uow.Add(user);
            await _uow.CommitAsync();
            return "Added";
        }

        [HttpPost("[action]")]
        public UserWithTokenModel Login([FromBody] LoginModel model)
        {

            var user = (from u in _uow.Query<User>()
                        where u.UserName == model.username && u.PassWord == model.password
                        select u).Include(x => x.Roles).ThenInclude(x => x.Role).FirstOrDefault();

            if (user == null)
            {
                return null;
            }

            var expiresIn = DateTime.Now + TokenAuthOption.ExpiresSpan;

            var token = _tokenBuilder.Build(model.username, expiresIn);

            return new UserWithTokenModel
            {
                Token = token,
                ExpiresAt = expiresIn,
                User = user
            };

        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task ChangePassword([FromBody] ChangeUserPasswordModel changePasswordModel)
        {
            var user = _uow.Query<User>().Where(x => !x.IsDeleted).FirstOrDefault(u => u.Id == _securityContext.user.Id);

            if (user ==null)
            {
                throw new NotFoundException("User is not found");
            }
            user.PassWord = changePasswordModel.Password;

            await _uow.CommitAsync();
        }
    }
}