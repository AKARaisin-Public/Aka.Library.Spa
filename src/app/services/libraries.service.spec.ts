import { TestBed, inject } from '@angular/core/testing';

import { LibrariesService } from './libraries.service';

describe('LibrariesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibrariesService]
    });
  });

  it('should be created', inject([LibrariesService], (service: LibrariesService) => {
    expect(service).toBeTruthy();
  }));
});
