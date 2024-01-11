import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExchangeDashComponent } from './admin-exchange-dash.component';

describe('AdminExchangeDashComponent', () => {
  let component: AdminExchangeDashComponent;
  let fixture: ComponentFixture<AdminExchangeDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminExchangeDashComponent]
    });
    fixture = TestBed.createComponent(AdminExchangeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
