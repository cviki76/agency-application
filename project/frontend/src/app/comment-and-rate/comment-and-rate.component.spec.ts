import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAndRateComponent } from './comment-and-rate.component';

describe('CommentAndRateComponent', () => {
  let component: CommentAndRateComponent;
  let fixture: ComponentFixture<CommentAndRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentAndRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAndRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
