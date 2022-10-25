import { Book } from './book';
export interface LibraryBook {
    libraryId: number;
    totalPurchasedByLibrary: number;
    book: Book;
}
