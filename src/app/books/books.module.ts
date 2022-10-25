import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { LibraryMatModule } from '../library-mat.module';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    LibraryMatModule
  ],
  declarations: [BookListComponent, BookDetailsComponent],
  exports: [BookListComponent],
  providers: []
})
export class BooksModule { }
