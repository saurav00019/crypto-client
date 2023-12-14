import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMultipleFileuploadPopupComponent } from './modal-multiple-fileupload-popup.component';

describe('ModalMultipleFileuploadPopupComponent', () => {
  let component: ModalMultipleFileuploadPopupComponent;
  let fixture: ComponentFixture<ModalMultipleFileuploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMultipleFileuploadPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMultipleFileuploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
