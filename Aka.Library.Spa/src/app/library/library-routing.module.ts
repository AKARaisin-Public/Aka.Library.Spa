import { LibraryListComponent } from './library-list/library-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryDetailsComponent } from './library-details/library-details.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthChildrenGuard } from '../guards/auth-children.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: LibraryListComponent },
  {
    path: ':lid/books',
    loadChildren: './books/books.module#BooksModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthChildrenGuard]
  },
  { path: ':id', component: LibraryDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
