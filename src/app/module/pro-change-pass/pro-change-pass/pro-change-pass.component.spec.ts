import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProChangePassComponent } from './pro-change-pass.component';

describe('ProChangePassComponent', () => {
  let component: ProChangePassComponent;
  let fixture: ComponentFixture<ProChangePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProChangePassComponent]
    });
    fixture = TestBed.createComponent(ProChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
