import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCommentsComponent } from './agency-comments.component';

describe('AgencyCommentsComponent', () => {
  let component: AgencyCommentsComponent;
  let fixture: ComponentFixture<AgencyCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
