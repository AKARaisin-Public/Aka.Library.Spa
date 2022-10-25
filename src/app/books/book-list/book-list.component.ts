import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BooksService } from '../../services/books.service';
import { Library } from '../../shared/library';
import { Component, OnInit, Input, ViewChild, AfterViewInit, HostBinding } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Book } from '../../shared/book';
import { slideInDownAnimation } from '../../animations';
import { Router, ActivatedRoute } from '@angular/router';
import { map as lmap, unionBy } from 'lodash';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [slideInDownAnimation]
})
export class BookListComponent implements OnInit, AfterViewInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'initial';

  currentLibrary: Library;
  displayedColumns = ['bookId', 'title', 'isbn', 'dateOfPublication', 'availability'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input()
  set library(value: Library) {
    this.currentLibrary = value;

    if (value != null) {
      forkJoin([
        this.books.getBooks(this.currentLibrary.libraryId),
        this.books.getAvailableBooks(this.currentLibrary.libraryId)
      ])
        .pipe(
          map(([books, availableBooks]) => {
            return unionBy(lmap(availableBooks, (book: Book) => ({ ...book, isAvailable: true })), books, 'bookId');
          })
        )
        .subscribe((books: Book []) => {
          this.dataSource.data = books;
        });
    }
  }

  constructor(private books: BooksService, private router: Router, private route: ActivatedRoute) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

  selectRow(book: Book) {
    this.router.navigate(['./books', book.bookId], { relativeTo: this.route });
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
