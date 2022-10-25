import { ConfirmValidParentMatcher, CustomValidators, errorMessages } from './../../validators/custom-validators';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ slideInDownAnimation ]
})

export class LoginComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'initial';

  isLoading: boolean;
  returnUrl: string;
  loginForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  errors = errorMessages;
  loginErrors: boolean;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginErrors = false;
    this.isLoading = false;
  }

  createForm(): any {
    this.loginForm = this.formBuilder.group({
      memberId: new FormControl('', [Validators.required])
    }, { validator: CustomValidators.childrenEqual });
  }

  getErrorMessage() {
    return this.loginForm.hasError('required') ? 'You must enter a value' :
      this.loginForm.hasError('memberId') ? 'Not a valid Id' :
        '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log('Form Submitted!');
      const memberId = +this.loginForm.value.memberId;
      this.auth.login(memberId)
        .subscribe(
          data => {
            this.loginErrors = false;
            console.log('Form Submitted passed');
            this.isLoading = false;

            // login successful so redirect to return url
            this.router.navigateByUrl(this.returnUrl);
          },
          error => {
            this.isLoading = false;
            console.log('Form Submitted failed');

            // login failed so display error
            this.loginErrors = true;
          });
    } else {
      this.loginErrors = true;
    }
  }

}
