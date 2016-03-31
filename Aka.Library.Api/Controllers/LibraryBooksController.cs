using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aka.Library.Data;
using Aka.Library.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aka.Library.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/libraries/{libraryId:int}/books")]
    public class LibraryBooksController : BaseController
    {
        public LibraryBooksController([FromServices] LibraryContext libraryContext)
            : base(libraryContext)
        { }

        /// <summary>
        /// Gets all the books that are at the library
        /// </summary>
        /// <param name="libraryId">Library Id</param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<LibraryBook> GetAllBooksFromLibrary(int libraryId)
        {
            var books = db.LibraryBook.Where(l => l.LibraryId == libraryId).Include(b => b.Book);

            return books;
        }

        /// <summary>
        /// Gets all the currently available books at the library
        /// </summary>
        /// <param name="libraryId">Library Id</param>
        /// <returns>Returns all available books</returns>
        [HttpGet("available")]
        public IEnumerable<BookTitle> GetAvailableBooks(int libraryId)
        {
            // TODO: Please write a Stored Procedure
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets all books at the library that are currently checked out
        /// </summary>
        /// <param name="libraryId">Library Id</param>
        /// <returns>Returns all available books</returns>
        [HttpGet("checkedout")]
        public IEnumerable<BookTitle> GetCheckedOutBooks(int libraryId)
        {
            // TODO: please write a linq query to get this data
            throw new NotImplementedException();
        }

        /// <summary>
        /// Updates all the details of a book
        /// </summary>
        /// <param name="libraryId">Library Id</param>
        /// <param name="book">Book details to update</param>
        [HttpPost]
        public async Task Post(int libraryId, [FromBody]BookTitle book)
        {
            var library = await db.Library.FirstOrDefaultAsync(o => o.LibraryId == libraryId);
            var lb = new LibraryBook
            {
                Book = book,
                Library = library
            };

            db.LibraryBook.Add(lb);
            await db.SaveChangesAsync();
        }

        /// <summary>
        /// Update the details of a book
        /// </summary>
        /// <param name="libraryId">Library Id</param>
        /// <param name="book">Book details to update</param>
        [HttpPut]
        public async Task Put(int libraryId, [FromBody]BookTitle book)
        {
            var lb = db.LibraryBook.FirstOrDefault(o => o.BookId == book.BookId && o.LibraryId == libraryId);

            if (lb == null)
            {
                db.LibraryBook.Remove(lb);
            }

            var newLibraryBook = new LibraryBook
            {
                Book = book,
                LibraryId = libraryId
            };

            db.LibraryBook.Add(newLibraryBook);

            await db.SaveChangesAsync();
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
