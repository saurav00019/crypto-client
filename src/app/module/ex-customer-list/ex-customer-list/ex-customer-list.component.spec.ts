import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExCustomerListComponent } from './ex-customer-list.component';

describe('ExCustomerListComponent', () => {
  let component: ExCustomerListComponent;
  let fixture: ComponentFixture<ExCustomerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExCustomerListComponent]
    });
    fixture = TestBed.createComponent(ExCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
