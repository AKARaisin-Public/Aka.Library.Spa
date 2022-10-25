import { MemberService } from './../../services/member.service';
import { Member } from './../interfaces/member';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members: Observable<Member[]>|null = null;

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.members = this.memberService.getMembers();
  }

  onMemberClicked(member): void {
    // tslint:disable-next-line:no-console
    console.info(member);
  }
}
