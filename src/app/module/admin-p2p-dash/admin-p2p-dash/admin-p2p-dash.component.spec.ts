import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminP2pDashComponent } from './admin-p2p-dash.component';

describe('AdminP2pDashComponent', () => {
  let component: AdminP2pDashComponent;
  let fixture: ComponentFixture<AdminP2pDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminP2pDashComponent]
    });
    fixture = TestBed.createComponent(AdminP2pDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
