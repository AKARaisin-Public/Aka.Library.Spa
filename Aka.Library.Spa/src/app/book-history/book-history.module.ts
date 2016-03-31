import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookHistoryRoutingModule } from './book-history-routing.module';
import { BookHistoryComponent } from './book-history/book-history.component';
import { LibraryMatModule } from '../library-mat.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookHistoryComponent],
  imports: [
    CommonModule,
    BookHistoryRoutingModule,
    FormsModule,
    LibraryMatModule
  ]
})
export class BookHistoryModule { }
