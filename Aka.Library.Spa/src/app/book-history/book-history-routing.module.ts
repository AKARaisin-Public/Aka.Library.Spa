import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookHistoryComponent } from './book-history/book-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BookHistoryComponent },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookHistoryRoutingModule { }
