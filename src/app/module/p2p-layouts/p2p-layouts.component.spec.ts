import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pLayoutsComponent } from './p2p-layouts.component';

describe('P2pLayoutsComponent', () => {
  let component: P2pLayoutsComponent;
  let fixture: ComponentFixture<P2pLayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2pLayoutsComponent]
    });
    fixture = TestBed.createComponent(P2pLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
