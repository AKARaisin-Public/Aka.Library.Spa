using System;
using System.Runtime.Serialization;

namespace Aka.Library.Data.Model
{
    [DataContract]
    public class MemberBook
    {
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
