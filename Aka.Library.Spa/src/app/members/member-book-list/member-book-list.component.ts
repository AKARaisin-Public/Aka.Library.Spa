import { MemberBook } from './../../members/interfaces/member-book';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Library } from './../../library/interfaces/library';
import { Component, OnInit, Input, ViewChild, AfterViewInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-member-book-list',
  templateUrl: './member-book-list.component.html',
  styleUrls: ['./member-book-list.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class MemberBookListComponent implements OnInit, AfterViewInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'initial';

  currentLibrary: Library;
  displayedColumns = ['bookId', 'title', 'whenSignedOut', 'whenReturned'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  set memberBooks(value: MemberBook[]){
    this.currentLibrary = null;

    this.dataSource.data = value;
  }

  constructor() { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
  }

  selectRow(library: Library) {
    // this.router.navigate(['/libraries', library.libraryId]);
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
