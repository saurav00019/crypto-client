import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetPositionComponent } from './net-position.component';

describe('NetPositionComponent', () => {
  let component: NetPositionComponent;
  let fixture: ComponentFixture<NetPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetPositionComponent]
    });
    fixture = TestBed.createComponent(NetPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
