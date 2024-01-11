import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pPendingOrderComponent } from './p2p-pending-order.component';

describe('P2pPendingOrderComponent', () => {
  let component: P2pPendingOrderComponent;
  let fixture: ComponentFixture<P2pPendingOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2pPendingOrderComponent]
    });
    fixture = TestBed.createComponent(P2pPendingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
