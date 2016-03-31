using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Aka.Library.Data;
using Aka.Library.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Aka.Library.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/libraries/{libraryId:int}/books/{bookId:int}/")]
    public class ManageBookController : BaseController
    {
        public ManageBookController([FromServices] LibraryContext libraryContext)
            : base(libraryContext)
        { }

        /// <summary>
        /// Get the book from library
        /// </summary>
        /// <param name="libraryId">Library Id</param>
        /// <param name="bookId">Book Id</param>
        /// <returns>BookTitle</returns>
        [HttpGet]
        public Task<BookTitle> GetBook(int libraryId, int bookId)
        {
            var book = db.LibraryBook
                .Where(l => l.LibraryId == libraryId && l.BookId == bookId)
                .Include(b => b.Book)
                .Select(lb=> lb.Book).FirstOrDefaultAsync();

            return book;
        }

        /// <summary>
        /// Sign out of a book for a member at a library
        /// </summary>
        /// <param name="memberId">Member Id</param>
        /// <param name="libraryId">Library Id</param>
        /// <param name="bookId">Book Id</param>
        /// <returns>Signed out book</returns>
        [HttpPost("signout/{memberId:int}")]
        public BookSignedOut Post(int libraryId, int bookId, int memberId)
        {
            throw new NotImplementedException();
        }


        /// <summary>
        /// Return of a book by a member to a library
        /// </summary>
        /// <param name="memberId">Member Id</param>
        /// <param name="bookId">Book Id to return</param>
        /// <param name="libraryId">Library Id that the book is being returned to</param>
        /// <returns></returns>
        [HttpPut("return/{memberId:int}")]
        public BookSignedOut Put(int memberId, int bookId, int libraryId)
        {
            var bso = db.BookSignedOut.FirstOrDefault(@lb => @lb.MemberId == memberId && @lb.LibraryBook.BookId == bookId && @lb.LibraryBook.LibraryId == libraryId && @lb.WhenReturned == null);

            if (bso == null)
            {
                throw new StatusCodeException(HttpStatusCode.NotFound);
            }

            bso.WhenReturned = DateTime.Now;

            db.Entry(bso).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                bool BookSignedOutExists(int lbid) => db.BookSignedOut.Count(e => e.LibraryBookSid == lbid) > 0;
                if (!BookSignedOutExists(bso.LibraryBookSid))
                {
                    throw new StatusCodeException(HttpStatusCode.NotFound);
                }
                else
                {
                    throw new StatusCodeException(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception)
            {
                throw new StatusCodeException(HttpStatusCode.NotFound);
            }

            return bso;
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