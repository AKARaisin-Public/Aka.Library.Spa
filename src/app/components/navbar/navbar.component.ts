import { Member } from './../../members/interfaces/member';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';
import { LoginButtonComponent } from './../login-button/login-button.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) { }

  getAuthUser(): Member {
    return this.auth.currentMember;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;
  }

}
