import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdharVerifyComponent } from './adhar-verify.component';

describe('AdharVerifyComponent', () => {
  let component: AdharVerifyComponent;
  let fixture: ComponentFixture<AdharVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdharVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdharVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
