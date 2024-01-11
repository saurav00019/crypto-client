import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2ptradingComponent } from './p2ptrading.component';

describe('P2ptradingComponent', () => {
  let component: P2ptradingComponent;
  let fixture: ComponentFixture<P2ptradingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2ptradingComponent]
    });
    fixture = TestBed.createComponent(P2ptradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
