import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWorkComponent } from './canvas-work.component';

describe('CanvasWorkComponent', () => {
  let component: CanvasWorkComponent;
  let fixture: ComponentFixture<CanvasWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
