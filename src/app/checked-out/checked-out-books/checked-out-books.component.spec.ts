import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedOutBooksComponent } from './checked-out-books.component';

describe('CheckedOutBooksComponent', () => {
  let component: CheckedOutBooksComponent;
  let fixture: ComponentFixture<CheckedOutBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckedOutBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedOutBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
