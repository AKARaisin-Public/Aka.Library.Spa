import { TestBed, async, inject } from '@angular/core/testing';

import { AuthChildrenGuard } from './auth-children.guard';

describe('AuthChildrenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthChildrenGuard]
    });
  });

  it('should ...', inject([AuthChildrenGuard], (guard: AuthChildrenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
