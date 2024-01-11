import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientP2pDashComponent } from './client-p2p-dash.component';

describe('ClientP2pDashComponent', () => {
  let component: ClientP2pDashComponent;
  let fixture: ComponentFixture<ClientP2pDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientP2pDashComponent]
    });
    fixture = TestBed.createComponent(ClientP2pDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
