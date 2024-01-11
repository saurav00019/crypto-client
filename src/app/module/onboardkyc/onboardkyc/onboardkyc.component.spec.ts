import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardkycComponent } from './onboardkyc.component';

describe('OnboardkycComponent', () => {
  let component: OnboardkycComponent;
  let fixture: ComponentFixture<OnboardkycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardkycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardkycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
