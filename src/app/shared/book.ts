export interface Book {
  bookId: number;
  title: string;
  isbn: string;
  dateOfPublication: Date;
  isAvailable?: boolean;
  isCheckedOut?: boolean;
}
