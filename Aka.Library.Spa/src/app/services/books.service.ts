import { environment } from '../../environments/environment';
import { LibraryBook } from '../shared/library-book';
import { Observable, forkJoin } from 'rxjs';
import { Book } from '../shared/book';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SignedOutBook } from '@shared/signed-out-book';
import { find, filter } from 'lodash';
import { GoogleBooksMetadata } from '../shared/google-books-metadata';

@Injectable()
export class BooksService {

  apiUrl: string;
  googleBooksAPIKey: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}${environment.apiPath}/libraries/`;
    this.googleBooksAPIKey = 'AIzaSyCCN_lQcnEQ51ohoDBroFvfwN8wnJi9iPY';
  }

  getBooks(libraryId: number): Observable<Book[]> {
    const url = `${this.apiUrl}${libraryId}/books`;
    return this.http.get<LibraryBook[]>(url)
      .pipe(
        map(items => items.map(item => item.book))
      );
  }

  getBook(libraryId: number, bid: number): Observable<Book> {
    const url = `${this.apiUrl}${libraryId}/books/${bid}`;
    return this.http.get<Book>(url);
  }

  getAvailableBooks(libraryId: number): Observable<Book []> {
    const url = `${this.apiUrl}${libraryId}/books/available`;
    return this.http.get<Book[]>(url);
  }

  getCheckedOutBooks(libraryId: number): Observable<Book []> {
    const url = `${this.apiUrl}${libraryId}/books/checkedout`;
    return this.http.get<Book[]>(url);
  }

  getTotalNumberOfCopiesInLibrary(libraryId: number, bookId: number): Observable<number> {
    const url = `${this.apiUrl}${libraryId}/books`;
    return this.http.get<LibraryBook[]>(url)
      .pipe(
        map(items => {
          const libBook = find(items, (item: LibraryBook) => item.book.bookId === bookId);
          return libBook.totalPurchasedByLibrary;
        })
      );
  }

  getNumberOfAvailableBookCopies(libraryId: number, bookId: number): Observable<number> {
    return forkJoin([
      this.getTotalNumberOfCopiesInLibrary(libraryId, bookId),
      this.getCheckedOutBooks(libraryId)
    ]).pipe(
      map(([totalNumberOfBookCopiesInLibrary, checkedOutBooks]) => {
        const numberOfCheckedOutCopies = filter(checkedOutBooks, (book: Book) => book.bookId === bookId).length;
        return totalNumberOfBookCopiesInLibrary - numberOfCheckedOutCopies;
      })
    );
  }

  checkOutBook(libraryId: number, bookId: number, memberId: number): Observable<SignedOutBook> {
    const url = `${this.apiUrl}${libraryId}/books/${bookId}/signout/${memberId}`;
    return this.http.post<SignedOutBook>(url, {});
  }

  returnBook(libraryId: number, bookId: number, memberId: number): Observable<SignedOutBook> {
    const url = `${this.apiUrl}${libraryId}/books/${bookId}/return/${memberId}`;
    return this.http.put<SignedOutBook>(url, {});
  }

  getBookMetaData(isbn: string): Observable<GoogleBooksMetadata> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${this.googleBooksAPIKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.items) {
          return response.items[0].volumeInfo;
        }
        return null;
      })
    );
  }

}
