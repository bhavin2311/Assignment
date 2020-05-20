using System;
using System.Collections.Generic;
using System.Text;

namespace Angular.Api.Models.Expenses
{
    public class ExpenseModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Comment { get; set; }

        public int UserId { get; set; }
        public string Username { get; set; }

    }
}
