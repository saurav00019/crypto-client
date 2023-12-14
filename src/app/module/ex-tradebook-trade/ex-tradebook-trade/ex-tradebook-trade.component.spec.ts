import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExTradebookTradeComponent } from './ex-tradebook-trade.component';

describe('ExTradebookTradeComponent', () => {
  let component: ExTradebookTradeComponent;
  let fixture: ComponentFixture<ExTradebookTradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExTradebookTradeComponent]
    });
    fixture = TestBed.createComponent(ExTradebookTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
