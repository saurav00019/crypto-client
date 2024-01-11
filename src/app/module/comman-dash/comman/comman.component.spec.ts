import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanComponent } from './comman.component';

describe('CommanComponent', () => {
  let component: CommanComponent;
  let fixture: ComponentFixture<CommanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommanComponent]
    });
    fixture = TestBed.createComponent(CommanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
