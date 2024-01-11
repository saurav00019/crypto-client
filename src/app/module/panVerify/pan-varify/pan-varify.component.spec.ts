import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanVarifyComponent } from './pan-varify.component';

describe('PanVarifyComponent', () => {
  let component: PanVarifyComponent;
  let fixture: ComponentFixture<PanVarifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanVarifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanVarifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
