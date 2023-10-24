import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Object } from '../models/object';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-form-for-cooperation',
  templateUrl: './form-for-cooperation.component.html',
  styleUrls: ['./form-for-cooperation.component.css']
})
export class FormForCooperationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService,private jobService:JobService,private router:Router) { }

  agencyUsername:string;
  user:User;
  retAddressObj:string;
  time:number;
  ngOnInit(): void {
    this.agencyUsername = this.route.snapshot.paramMap.get('agencyUsername')
    this.userService.getUser(localStorage.getItem('usernameLoggedIn')).subscribe((user:User)=>{
      this.user = user
    })
  }

  createJob(){
    let job = new Job()
    job.agencyUsername = this.agencyUsername;
    job.objectAddress = this.retAddressObj;
    job.timePeriod = this.time
    job.clientUsername = this.user.username
    job.status = "waiting"
    this.jobService.addJob(job).subscribe((resp)=>{
      this.router.navigate(['agencies'])
    })
  }

  back(){
    this.router.navigate(['agencies'])
  }

}
