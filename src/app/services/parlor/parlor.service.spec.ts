import { TestBed } from '@angular/core/testing';

import { ParlorService } from './parlor.service';

describe('ParlorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParlorService = TestBed.get(ParlorService);
    expect(service).toBeTruthy();
  });
});
