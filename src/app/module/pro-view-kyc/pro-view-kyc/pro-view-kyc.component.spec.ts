import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProViewKycComponent } from './pro-view-kyc.component';

describe('ProViewKycComponent', () => {
  let component: ProViewKycComponent;
  let fixture: ComponentFixture<ProViewKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProViewKycComponent]
    });
    fixture = TestBed.createComponent(ProViewKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
