import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthChildrenGuard } from './guards/auth-children.guard';
import { AuthGuard } from './guards/auth.guard';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { MemberService } from './services/member.service';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { BooksModule } from './books/books.module';
import { LibraryMatModule } from './library-mat.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BooksService } from './services/books.service';
import { LibrariesService } from './services/libraries.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoginButtonComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    LibraryMatModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LibraryMatModule,
    BooksModule
  ],
  providers: [
    MemberService,
    AuthService,
    AuthGuard,
    AuthChildrenGuard,
    BooksService,
    LibrariesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('pc-theme');
  }
}
