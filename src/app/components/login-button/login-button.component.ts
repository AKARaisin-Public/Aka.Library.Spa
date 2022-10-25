import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {
  cssClass: string;
  isLoggedIn$: Observable<boolean>;

  @Input()
  set css(css: string) {
    this.cssClass = css;
  }

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;
  }

  onLogout(event) {
    this.auth.logout();
  }
}
