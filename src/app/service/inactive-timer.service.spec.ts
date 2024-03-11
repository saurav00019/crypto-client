import { TestBed } from '@angular/core/testing';

import { InactiveTimerService } from './inactive-timer.service';

describe('InactiveTimerService', () => {
  let service: InactiveTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactiveTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
