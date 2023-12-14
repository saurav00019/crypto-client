import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pTicketComponent } from './p2p-ticket.component';

describe('P2pTicketComponent', () => {
  let component: P2pTicketComponent;
  let fixture: ComponentFixture<P2pTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2pTicketComponent]
    });
    fixture = TestBed.createComponent(P2pTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
