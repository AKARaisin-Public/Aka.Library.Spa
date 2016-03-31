import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../shared/book';
import { MemberService } from '../../services/member.service';
import { AuthService } from '../../services/auth.service';
import { SignedOutBook } from '../../shared/signed-out-book';
import { map, mergeAll } from 'rxjs/operators';
import { forkJoin, zip } from 'rxjs';
import { SignedOutBookDetails } from '../../shared/signed-out-book-details';
import { LibrariesService } from '../../services/libraries.service';
import { BooksService } from '../../services/books.service';
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-checked-out-books',
  templateUrl: './checked-out-books.component.html',
  styleUrls: ['./checked-out-books.component.scss'],
  animations: [slideInDownAnimation]
})
export class CheckedOutBooksComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'initial';

  displayedColumns = ['id', 'library', 'title', 'dateCheckedOut', 'action'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibrariesService,
    private booksService: BooksService
    ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.memberService.getSignedOutBooks(this.authService.currentMember)
      .pipe(
        map((signedOutBooks: SignedOutBook []) => {
          const obss = signedOutBooks.map(signedOutBook => forkJoin([
            this.libraryService.getLibrary(signedOutBook.libraryId),
            this.booksService.getBook(signedOutBook.libraryId, signedOutBook.bookId)
          ])
                .pipe(
                  map(([library, book]) => ({ ...signedOutBook, libraryName: library.name, bookName: book.title }))
                ));
          return zip(...obss);
        }),
        mergeAll()
      ).subscribe((signedOutBooksDetails: SignedOutBookDetails []) => {
        this.dataSource.data = signedOutBooksDetails;
      });
  }

  selectRow(book: SignedOutBookDetails) {
    this.router.navigate([`/libraries/${book.libraryId}/books/${book.bookId}`]);
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
