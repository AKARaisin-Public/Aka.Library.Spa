using System.Collections.Generic;

namespace Aka.Library.Data.Entities
{
    public partial class Member
    {
        public Member()
        {
            BookSignedOuts = new HashSet<BookSignedOut>();
        }

        public int MemberId { get; set; }
        public string FullName { get; set; }
        public string PostalCode { get; set; }

        public ICollection<BookSignedOut> BookSignedOuts { get; set; }
    }
}
