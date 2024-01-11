import { TestBed } from '@angular/core/testing';

import { WebnewService } from './webnew.service';

describe('WebnewService', () => {
  let service: WebnewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebnewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
