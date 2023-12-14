import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExSubamdinComponent } from './ex-subamdin.component';

describe('ExSubamdinComponent', () => {
  let component: ExSubamdinComponent;
  let fixture: ComponentFixture<ExSubamdinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExSubamdinComponent]
    });
    fixture = TestBed.createComponent(ExSubamdinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
