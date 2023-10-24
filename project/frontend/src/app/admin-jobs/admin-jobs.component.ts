import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { Object } from '../models/object';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  constructor(private jobService:JobService,private router:Router) { }

  jobs:Job[]

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe((jobs:Job[])=>{
      this.jobs = jobs
    })
  }

  back(){
    this.router.navigate(['admin'])
  }

  preview(clientUsername,objectAddress){
    this.jobService.getObjectFromObjectAddress(clientUsername,objectAddress).subscribe((obj:Object)=>{
      this.router.navigate(['canvas',{obj:JSON.stringify(obj),adminFlag:1}])
    })

    
  }

  logout(){
    this.router.navigate([''])
  }
}
