import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

// import { canActivateGuard } from './can-activate.guard';
import { KYCGuard } from './kyc.guard';

describe('KYCGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => KYCGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
