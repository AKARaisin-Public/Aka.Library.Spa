using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aka.Library.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aka.Library.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/libraries")]
    public class LibrariesController : BaseController
    {
        public LibrariesController([FromServices] LibraryContext libraryContext)
            : base(libraryContext)
        { }
        
        /// <summary>
        /// Gets a list of all the libraries in the system
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Task<List<Data.Entities.Library>> Get()
        {
            return db.Library.ToListAsync();
        }

        /// <summary>
        /// Get a list of all the library details 
        /// </summary>
        /// <param name="id">Library Id</param>
        /// <returns>Library</returns>
        [HttpGet("{id}", Name = "Get")]
        public async Task<Data.Entities.Library> Get(int id)
        {
            throw new NotImplementedException();
        }
        
        /// <summary>
        /// Updates the library information
        /// </summary>
        /// <param name="library"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task Post([FromBody]Data.Entities.Library library)
        {
            await db.Library.AddAsync(library);
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
