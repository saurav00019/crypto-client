import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoVerifyComponent } from './video-verify.component';

describe('VideoVerifyComponent', () => {
  let component: VideoVerifyComponent;
  let fixture: ComponentFixture<VideoVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
