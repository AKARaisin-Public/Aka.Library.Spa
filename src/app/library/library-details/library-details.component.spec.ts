import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDetailsComponent } from './library-details.component';

describe('LibraryDetailsComponent', () => {
  let component: LibraryDetailsComponent;
  let fixture: ComponentFixture<LibraryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
