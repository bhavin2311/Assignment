using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular.Api.Models.Expenses;
using Angular.Data.Access.DAL;
using Angular.Data.Models;
using Angular.Filters;
using Angular.Security;
using Microsoft.AspNetCore.Mvc;

namespace Angular.RestAPI
{

    [Route("api/[controller]")]
    [ApiController]

    public class ExpensesController : Controller
    {
        private readonly ISecurityContext _securityContext;

        private readonly IUnitOfWork _uow;

        public ExpensesController(IUnitOfWork uow, ISecurityContext securityContext)
        {
            _uow = uow;

            _securityContext = securityContext;
        }
        [HttpGet()]
        public IEnumerable<Expense> Get()
        {
            var result = GetQuery();
            return result.AsEnumerable();
        }

        [HttpPost()]
        public async Task<ExpenseModel> Post([FromBody]CreateExpenseModel model)
        {
            var item = new Expense
            {
                UserId = _securityContext.user.Id,
                Amount = model.Amount,
                Comment = model.Comment,
                Date = model.Date,
                Description = model.Description,
            };
            _uow.Add(item);
            await _uow.CommitAsync();

            var result = new ExpenseModel
            {
                Amount = item.Amount,
                Comment = item.Comment,
                Date = item.Date,
                Description = item.Description,
                Id = item.Id,
                UserId = item.UserId
            };
            return result;
        }

        [HttpPut("{id}")]
        public async Task<Expense> Put(int id, [FromBody]UpdateExpenseModel model)
        {

            var expense = _uow.Query<Expense>()
                .Where(x => !x.IsDeleted)
                .Where(a => a.UserId == _securityContext.user.Id)
                .Where(a => a.Id == id).FirstOrDefault();
            if (expense == null)
            {
                throw new NotFoundException("Expense is not found");
            }
            expense.Amount = model.Amount;
            expense.Comment = model.Comment;
            expense.Description = model.Description;
            expense.Date = model.Date;
            expense.UserId = _securityContext.user.Id;
            //expense.User = _uow.Query<User>().FirstOrDefault(a => a.Id == expense.UserId);
            //expense.User = _securityContext.user;
            await _uow.CommitAsync();

            return expense;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var expense =  GetQuery().FirstOrDefault(u => u.Id == id);

            if (expense == null)
            {
                throw new NotFoundException("Expense is not found");
            }
            if (expense.IsDeleted) return;

            expense.IsDeleted = true;
            await _uow.CommitAsync();

        }

        private IQueryable<Expense> GetQuery()
        {
            var q = _uow.Query<Expense>()
                .Where(x => !x.IsDeleted);

            var userId = _securityContext.user.Id;
            q = q.Where(x => x.UserId == userId);

            return q;
        }
    }
}