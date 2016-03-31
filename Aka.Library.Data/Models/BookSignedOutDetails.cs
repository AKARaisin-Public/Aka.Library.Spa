using System;
using System.Runtime.Serialization;

namespace Aka.Library.Data.Models
{
    [DataContract]
    public class BookSignedOutDetails
    {
        [DataMember]
        public int LibraryBookSid { get; set; }

        [DataMember]
        public int LibraryId { get; set; }

        [DataMember]
        public int BookId { get; set; }

        [DataMember]
        public int MemberId { get; set; }

        [DataMember]
        public DateTime WhenSignedOut { get; set; }

        [DataMember]
        public DateTime? WhenReturned { get; set; }
    }
}
