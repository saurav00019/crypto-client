import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pTransactionViewComponent } from './p2p-transaction-view.component';

describe('P2pTransactionViewComponent', () => {
  let component: P2pTransactionViewComponent;
  let fixture: ComponentFixture<P2pTransactionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2pTransactionViewComponent]
    });
    fixture = TestBed.createComponent(P2pTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
