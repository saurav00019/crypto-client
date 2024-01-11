import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteEarnComponent } from './invite-earn.component';

describe('InviteEarnComponent', () => {
  let component: InviteEarnComponent;
  let fixture: ComponentFixture<InviteEarnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteEarnComponent]
    });
    fixture = TestBed.createComponent(InviteEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
