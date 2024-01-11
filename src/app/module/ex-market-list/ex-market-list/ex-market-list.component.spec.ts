import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExMarketListComponent } from './ex-market-list.component';

describe('ExMarketListComponent', () => {
  let component: ExMarketListComponent;
  let fixture: ComponentFixture<ExMarketListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExMarketListComponent]
    });
    fixture = TestBed.createComponent(ExMarketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
