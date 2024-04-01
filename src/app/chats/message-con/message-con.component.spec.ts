import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageConComponent } from './message-con.component';

describe('MessageConComponent', () => {
  let component: MessageConComponent;
  let fixture: ComponentFixture<MessageConComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageConComponent]
    });
    fixture = TestBed.createComponent(MessageConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
