import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExYourorderComponent } from './ex-yourorder.component';

describe('ExYourorderComponent', () => {
  let component: ExYourorderComponent;
  let fixture: ComponentFixture<ExYourorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExYourorderComponent]
    });
    fixture = TestBed.createComponent(ExYourorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
