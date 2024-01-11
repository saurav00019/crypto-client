import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProPersonalDetailComponent } from './pro-personal-detail.component';

describe('ProPersonalDetailComponent', () => {
  let component: ProPersonalDetailComponent;
  let fixture: ComponentFixture<ProPersonalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProPersonalDetailComponent]
    });
    fixture = TestBed.createComponent(ProPersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
