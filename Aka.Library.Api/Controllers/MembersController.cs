using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Aka.Library.Data;
using Aka.Library.Data.Entities;

namespace Aka.Library.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/members")]
    public class MembersController : BaseController
    {
        public MembersController([FromServices] LibraryContext libraryContext)
            : base(libraryContext)
        {
        }

        // GET: api/Members
        [HttpGet]
        public IEnumerable<Member> GetMember()
        {
            return db.Member.Include(m => m.BookSignedOuts);
        }

        /// <summary>
        /// Get a members' information
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMember([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var member = await db.Member.Where(m => m.MemberId == id)
                .Include(m => m.BookSignedOuts)
                .FirstOrDefaultAsync();

            if (member == null)
            {
                return NotFound();
            }

            return Ok(member);
        }

        /// <summary>
        /// Updates a members' details
        /// </summary>
        /// <param name="id"></param>
        /// <param name="member"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember([FromRoute] int id, [FromBody] Member member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != member.MemberId)
            {
                return BadRequest();
            }

            var isChanged = false;
            var foundMember = await db.Member.FirstOrDefaultAsync(o => o.MemberId == id);

            if (foundMember.FullName != member.FullName)
            {
                foundMember.FullName = member.FullName;
                isChanged = true;
            }

            if (foundMember.PostalCode != member.PostalCode)
            {
                foundMember.PostalCode = member.PostalCode;
                isChanged = true;
            }

            if (isChanged)
            {
                db.Entry(member).State = EntityState.Modified;
            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(foundMember);
        }

        /// <summary>
        /// Create a new member
        /// </summary>
        /// <param name="member"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> PostMember([FromBody] Member member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Member.Add(member);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetMember", new { id = member.MemberId }, member);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var member = await db.Member.SingleOrDefaultAsync(m => m.MemberId == id);
            if (member == null)
            {
                return NotFound();
            }

            db.Member.Remove(member);
            await db.SaveChangesAsync();

            return Ok(member);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MemberExists(int id)
        {
            return db.Member.Any(e => e.MemberId == id);
        }
    }
}