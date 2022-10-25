import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from './../../services/member.service';
import { slideInDownAnimation } from './../../animations';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Member } from '../interfaces/member';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { MemberBook } from '../interfaces/member-book';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
  animations: [slideInDownAnimation]
})
export class MemberDetailsComponent implements OnInit {
  loginErrors: boolean;
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'initial';

  firstName: string;
  lastName: string;
  postalCode: string;
  memberForm: FormGroup;
  member$: Observable<Member>;
  bookhistory$: Observable<MemberBook[]>;
  signedout$: Observable<MemberBook[]>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: MemberService,
    private auth: AuthService) {
    this.createForm();
  }
  createForm(): any {
    this.memberForm = this.formBuilder.group({
      firstName: new FormControl(this.firstName, [Validators.required]),
      lastName: new FormControl(this.lastName, [Validators.required]),
      postalCode: new FormControl(this.postalCode, [Validators.required])
    });
  }

  ngOnInit() {
    this.member$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
        this.service.getMember(+params.get('id'))),
        tap(m => {
          this.firstName = m.fullName.split(' ')[0];
          this.lastName = m.fullName.split(' ')[1];
          this.postalCode = m.postalCode;
        })
      );
  }

  onSubmit() {
    if (this.memberForm.valid) {
      const m = this.memberForm.value;
      const updatedMember = this.auth.currentMember;
      updatedMember.fullName = `${m.firstName} ${m.lastName}`;
      updatedMember.postalCode = m.postalCode;

      this.service.update(updatedMember)
        .pipe(tap(console.log))
        .subscribe(result => this.auth.currentMember = result);
    }
  }

  reset(event: any) {
    event.preventDefault();

    const m = this.auth.currentMember;
    this.firstName = m.fullName.split(' ')[0];
    this.lastName = m.fullName.split(' ')[1];
    this.postalCode = m.postalCode;
  }

}
