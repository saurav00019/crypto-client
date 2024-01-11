import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pPackageComponent } from './p2p-package.component';

describe('P2pPackageComponent', () => {
  let component: P2pPackageComponent;
  let fixture: ComponentFixture<P2pPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P2pPackageComponent]
    });
    fixture = TestBed.createComponent(P2pPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
