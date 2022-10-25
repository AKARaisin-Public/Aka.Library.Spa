import { MemberBookListComponent } from './member-book-list/member-book-list.component';
import { LibraryMatModule } from './../library-mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

@NgModule({
  imports: [
    CommonModule,
    MembersRoutingModule,
    LibraryMatModule
  ],
  exports: [
    MemberListComponent,
    MemberDetailsComponent,
    LibraryMatModule
  ],
  declarations: [MemberListComponent, MemberDetailsComponent, MemberBookListComponent]
})
export class MembersModule { }
