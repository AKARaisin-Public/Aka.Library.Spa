import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBookListComponent } from './member-book-list.component';

describe('MemberBookListComponent', () => {
  let component: MemberBookListComponent;
  let fixture: ComponentFixture<MemberBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
