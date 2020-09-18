import { TestBed } from '@angular/core/testing';

import { DiginixService } from './diginix.service';

describe('DiginixService', () => {
  let service: DiginixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiginixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
