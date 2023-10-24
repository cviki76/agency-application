import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForCooperationComponent } from './form-for-cooperation.component';

describe('FormForCooperationComponent', () => {
  let component: FormForCooperationComponent;
  let fixture: ComponentFixture<FormForCooperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormForCooperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormForCooperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
