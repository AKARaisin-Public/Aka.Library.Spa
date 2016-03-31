using Aka.Library.Data;
using Microsoft.AspNetCore.Mvc;

namespace Aka.Library.Api.Controllers
{
    public class BaseController : Controller
    {   
        public BaseController([FromServices]LibraryContext libraryContext)
        {
            db = libraryContext;
        }
        
        public LibraryContext db { get; }
    }
}