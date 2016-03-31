import { BooksModule } from './../books/books.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryDetailsComponent } from './library-details/library-details.component';
import { LibraryListComponent } from './library-list/library-list.component';
import { LibrariesService } from '../services/libraries.service';
import { LibraryMatModule } from '../library-mat.module';

@NgModule({
  exports: [
    LibraryListComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    LibraryMatModule,
    BooksModule
  ],
  declarations: [
    LibraryDetailsComponent,
    LibraryListComponent
  ],
  providers: [LibrariesService]
})
export class LibraryModule { }
