import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExLayoutsComponent } from './ex-layouts.component';

describe('ExLayoutsComponent', () => {
  let component: ExLayoutsComponent;
  let fixture: ComponentFixture<ExLayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExLayoutsComponent]
    });
    fixture = TestBed.createComponent(ExLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
