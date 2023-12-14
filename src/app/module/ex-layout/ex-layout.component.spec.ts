import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExLayoutComponent } from './ex-layout.component';

describe('ExLayoutComponent', () => {
  let component: ExLayoutComponent;
  let fixture: ComponentFixture<ExLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExLayoutComponent]
    });
    fixture = TestBed.createComponent(ExLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
