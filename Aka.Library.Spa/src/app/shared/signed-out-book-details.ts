import { SignedOutBook } from './signed-out-book';
export interface SignedOutBookDetails extends SignedOutBook {
  libraryName: string;
  bookName: string;
}
