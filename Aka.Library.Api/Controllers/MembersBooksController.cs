using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Aka.Library.Data;

namespace Aka.Library.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/members/{mid:int}/books")]
    public class MembersBooksController : BaseController
    {
        public MembersBooksController([FromServices] LibraryContext libraryContext)
            : base(libraryContext)
        {
        }

        /// <summary>
        /// Gets all the current books that a member has checked/signed out
        /// </summary>
        /// <param name="mid">Member Id</param>
        /// <returns></returns>
        [HttpGet("signedout")]
        public async Task<IActionResult> GetMemberBooks(int mid)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets all the books that a member has checked/signed out in the past
        /// </summary>
        /// <param name="mid">Member Id</param>
        /// <returns></returns>
        [HttpGet("history")]
        public async Task<IActionResult> GetMemberBooksHistory(int mid)
        {
            throw new NotImplementedException();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}