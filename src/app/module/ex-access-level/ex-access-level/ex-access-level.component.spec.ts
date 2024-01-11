import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExAccessLevelComponent } from './ex-access-level.component';

describe('ExAccessLevelComponent', () => {
  let component: ExAccessLevelComponent;
  let fixture: ComponentFixture<ExAccessLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExAccessLevelComponent]
    });
    fixture = TestBed.createComponent(ExAccessLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
