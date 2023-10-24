import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { JobService } from '../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Object } from '../models/object';

@Component({
  selector: 'app-jobs-agency',
  templateUrl: './jobs-agency.component.html',
  styleUrls: ['./jobs-agency.component.css']
})
export class JobsAgencyComponent implements OnInit {

  constructor(private jobService:JobService,private route:ActivatedRoute,private router:Router) { }
  bid:number;
  jobsWaiting:Job[]
  jobsActive:Job[]

  ngOnInit(): void {
    this.init()
  }
  init (){
    this.jobService.getJobsForAgency(this.route.snapshot.paramMap.get('agencyUsername')).subscribe((jobs:Job[])=>{
      let waitJobs = []
      let actJobs = []
      for(let job of jobs){
        if (job.status == "waiting"){
          waitJobs.push(job)
        }
        else if (job.status == "active"){
          actJobs.push(job)
        }
      }
      this.jobsWaiting = waitJobs
      this.jobsActive = actJobs
    }) 
  }
  preview(clientUsername,objectAddress){
    this.jobService.getObjectFromObjectAddress(clientUsername,objectAddress).subscribe((obj:Object)=>{
      this.router.navigate(['canvas',{obj:JSON.stringify(obj),clientFlag:0,agencyUsername:this.route.snapshot.paramMap.get('agencyUsername')}])
    })
  }
  accept(agencyUsername,objectAddress){
    this.jobService.acceptOffer(agencyUsername,objectAddress,this.bid).subscribe((resp)=>{
    })
    this.init()
  }

  decline(agencyUsername,objectAddress){
    this.jobService.declineOffer(agencyUsername,objectAddress).subscribe((resp)=>{
    })
    this.init()
  }

  work(clientUsername,objectAddress){
    this.jobService.getObjectFromObjectAddress(clientUsername,objectAddress).subscribe((obj:Object)=>{
      this.router.navigate(['canvasWork',{obj:JSON.stringify(obj),clientUsername:clientUsername,agencyUsername:this.route.snapshot.paramMap.get('agencyUsername')}])
    })
  }

  back(){
    this.router.navigate(['agency'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
