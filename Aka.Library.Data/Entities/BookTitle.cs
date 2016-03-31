using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Aka.Library.Data.Entities
{
    [DataContract]
    public partial class BookTitle
    {
        public BookTitle()
        {
            LibraryBooks = new HashSet<LibraryBook>();
        }

        [DataMember]
        public int BookId { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public string Isbn { get; set; }

        [DataMember]
        public DateTime? DateOfPublication { get; set; }

        public ICollection<LibraryBook> LibraryBooks { get; set; }
    }
}
