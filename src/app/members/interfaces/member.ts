import { BookSignedOut } from './book-signed-out';

export interface Member {
  memberId: number;
  fullName: string;
  postalCode: string;
  bookSignedOuts: BookSignedOut[];
}
