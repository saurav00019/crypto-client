import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountComponent } from './wallet-account.component';

describe('WalletAccountComponent', () => {
  let component: WalletAccountComponent;
  let fixture: ComponentFixture<WalletAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletAccountComponent]
    });
    fixture = TestBed.createComponent(WalletAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
