import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientExchangeDashComponent } from './client-exchange-dash.component';

describe('ClientExchangeDashComponent', () => {
  let component: ClientExchangeDashComponent;
  let fixture: ComponentFixture<ClientExchangeDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientExchangeDashComponent]
    });
    fixture = TestBed.createComponent(ClientExchangeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
