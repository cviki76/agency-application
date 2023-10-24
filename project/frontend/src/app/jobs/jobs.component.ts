import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { Object } from '../models/object';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private jobService:JobService,private router:Router) { }

  jobs:Job[]
  obj:Object;
  filterBy:string;

  ngOnInit(): void {
    this.init()
  }

  init(){
    this.jobService.getJobsForClient(localStorage.getItem('usernameLoggedIn')).subscribe((jobs:Job[])=>{
      this.jobs = jobs
    })
  }

  filter(){
    this.jobService.getJobsForClient(localStorage.getItem('usernameLoggedIn')).subscribe((jobs:Job[])=>{
      this.jobs = jobs
      if(this.filterBy != null && this.filterBy != "all"){
        if (this.filterBy == 'request'){
          this.jobs = this.jobs.filter(obj => obj.status == 'accepted' || obj.status == 'declined' || obj.status == 'waiting');
        }
        else{
          this.jobs = this.jobs.filter(obj => obj.status == this.filterBy);
        }
      } 
    })
  }
  preview(object){
    this.jobService.getObjectFromObjectAddress(localStorage.getItem('usernameLoggedIn'),object).subscribe((obj:Object)=>{
      this.router.navigate(['canvas',{obj:JSON.stringify(obj),clientFlag:1,jobsFlag:1}])
    })
  }
  acceptBid(agencyUsername,objectAddress){
        this.jobService.acceptBid(agencyUsername,objectAddress).subscribe((resp)=>{
          this.init()
        })
  }

  declineBid(agencyUsername,objectAddress){
    this.jobService.declineBid(agencyUsername,objectAddress).subscribe((resp)=>{
      this.init()
    })
  }

  commentAandRate(agencyUsername){
    this.router.navigate(['commentAndRate',{agencyUsername:agencyUsername}])
  }
  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }  
  back(){
    this.router.navigate(['client'])
  }

}
