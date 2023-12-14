import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pPendingDetailsComponent } from './p2p-pending-details.component';

describe('P2pPendingDetailsComponent', () => {
  let component: P2pPendingDetailsComponent;
  let fixture: ComponentFixture<P2pPendingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2pPendingDetailsComponent]
    });
    fixture = TestBed.createComponent(P2pPendingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
