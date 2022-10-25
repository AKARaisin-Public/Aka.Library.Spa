export interface SignedOutBook {
  libraryBookSid: number;
  libraryId: number;
  bookId: number;
  memberId: number;
  whenSignedOut: string;
  whenReturned: string;
}
