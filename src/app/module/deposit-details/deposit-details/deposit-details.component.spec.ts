import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositDetailsComponent } from './deposit-details.component';

describe('DepositDetailsComponent', () => {
  let component: DepositDetailsComponent;
  let fixture: ComponentFixture<DepositDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositDetailsComponent]
    });
    fixture = TestBed.createComponent(DepositDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
