using System.Runtime.Serialization;

namespace Aka.Library.Data.Entities
{
    [DataContract]
    public partial class LibraryBook
    {
        public int LibraryBookSid { get; set; }

        [DataMember]
        public int LibraryId { get; set; }
        
        public int BookId { get; set; }

        [DataMember]
        public int TotalPurchasedByLibrary { get; set; }

        [DataMember]
        public BookTitle Book { get; set; }

        public Library Library { get; set; }
    }
}
