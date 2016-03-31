using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Aka.Library.Data.Entities
{
    [DataContract]
    public partial class Library
    {
        public Library()
        {
            LibraryBooks = new HashSet<LibraryBook>();
        }

        [DataMember]
        public int LibraryId { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string City { get; set; }

        public ICollection<LibraryBook> LibraryBooks { get; set; }
    }
}
