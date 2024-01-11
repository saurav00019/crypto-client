import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPtwopComponent } from './header-ptwop.component';

describe('HeaderPtwopComponent', () => {
  let component: HeaderPtwopComponent;
  let fixture: ComponentFixture<HeaderPtwopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPtwopComponent]
    });
    fixture = TestBed.createComponent(HeaderPtwopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
