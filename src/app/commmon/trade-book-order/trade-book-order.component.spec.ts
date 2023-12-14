import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeBookOrderComponent } from './trade-book-order.component';

describe('TradeBookOrderComponent', () => {
  let component: TradeBookOrderComponent;
  let fixture: ComponentFixture<TradeBookOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradeBookOrderComponent]
    });
    fixture = TestBed.createComponent(TradeBookOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
