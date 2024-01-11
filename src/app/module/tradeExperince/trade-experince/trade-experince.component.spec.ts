import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeExperinceComponent } from './trade-experince.component';

describe('TradeExperinceComponent', () => {
  let component: TradeExperinceComponent;
  let fixture: ComponentFixture<TradeExperinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeExperinceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeExperinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
