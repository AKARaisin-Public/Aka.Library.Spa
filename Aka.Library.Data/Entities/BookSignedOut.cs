using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Aka.Library.Data.Entities
{
    [DataContract]
    public partial class BookSignedOut
    {
        [DataMember]
        public int LibraryBookSid { get; set; }

        [DataMember]
        public int MemberId { get; set; }

        [DataMember]
        public DateTime WhenSignedOut { get; set; }

        [DataMember]
        public DateTime? WhenReturned { get; set; }

        public Member Member { get; set; }

        [ForeignKey("LibraryBookSid")]
        public LibraryBook LibraryBook { get; set; }
    }
}
