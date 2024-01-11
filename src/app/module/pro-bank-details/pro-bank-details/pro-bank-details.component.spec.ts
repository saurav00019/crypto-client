import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProBankDetailsComponent } from './pro-bank-details.component';

describe('ProBankDetailsComponent', () => {
  let component: ProBankDetailsComponent;
  let fixture: ComponentFixture<ProBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProBankDetailsComponent]
    });
    fixture = TestBed.createComponent(ProBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
