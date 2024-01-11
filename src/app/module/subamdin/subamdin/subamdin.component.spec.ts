import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubamdinComponent } from './subamdin.component';

describe('SubamdinComponent', () => {
  let component: SubamdinComponent;
  let fixture: ComponentFixture<SubamdinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubamdinComponent]
    });
    fixture = TestBed.createComponent(SubamdinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
