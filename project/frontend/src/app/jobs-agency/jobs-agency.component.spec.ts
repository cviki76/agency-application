import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAgencyComponent } from './jobs-agency.component';

describe('JobsAgencyComponent', () => {
  let component: JobsAgencyComponent;
  let fixture: ComponentFixture<JobsAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
