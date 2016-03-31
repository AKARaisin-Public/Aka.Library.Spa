using Aka.Library.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Aka.Library.Data
{
    public partial class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions options) 
            : base(options)
        {}
        
        public virtual DbSet<BookSignedOut> BookSignedOut { get; set; }
        public virtual DbSet<BookTitle> BookTitle { get; set; }
        public virtual DbSet<Entities.Library> Library { get; set; }
        public virtual DbSet<LibraryBook> LibraryBook { get; set; }
        public virtual DbSet<Member> Member { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Data Source=aka8sql.akanm.com;Database=Library;user id=Candidate;password=Did*2016;MultipleActiveResultSets=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookSignedOut>(entity =>
            {
                entity.HasKey(e => new { e.LibraryBookSid, e.MemberId, e.WhenSignedOut });

                entity.Property(e => e.LibraryBookSid).HasColumnName("LibraryBookSId");

                entity.Property(e => e.WhenSignedOut).HasColumnType("datetime");

                entity.Property(e => e.WhenReturned).HasColumnType("datetime");

                entity.HasOne(d => d.Member)
                    .WithMany(p => p.BookSignedOuts)
                    .HasForeignKey(d => d.MemberId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BookSignedOut_Member");
            });

            modelBuilder.Entity<BookTitle>(entity =>
            {
                entity.HasKey(e => e.BookId);

                entity.Property(e => e.DateOfPublication).HasColumnType("datetime");

                entity.Property(e => e.Isbn)
                    .HasColumnName("ISBN")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Entities.Library>(entity =>
            {
                entity.Property(e => e.City)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LibraryBook>(entity =>
            {
                entity.HasKey(e => e.LibraryBookSid);

                entity.ToTable("Library_Book");

                entity.Property(e => e.LibraryBookSid).HasColumnName("LibraryBookSId");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.LibraryBooks)
                    .HasForeignKey(d => d.BookId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Library_Book_BookTitle");

                entity.HasOne(d => d.Library)
                    .WithMany(p => p.LibraryBooks)
                    .HasForeignKey(d => d.LibraryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Library_Book_Library");
            });

            modelBuilder.Entity<Member>(entity =>
            {
                entity.Property(e => e.FullName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PostalCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
