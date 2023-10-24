import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../services/worker.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {

  constructor(private workerService: WorkerService,private http: HttpClient,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.agencyUnder = this.route.snapshot.paramMap.get('agencyUsername')
  }

  firstname:string;
  lastname:string;
  email:string;
  phoneNumber:string;
  specialization:string;
  agencyUnder:string;
  message:string;

  addWorker(){
    const phoneNumberRegex = /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    this.workerService.getWorker(this.email).subscribe((worker:Worker)=>{
      if(worker == null){
        if(emailRegex.test(this.email) == false){
          this.message = "Email doesn't meet the requirements!"
        }
        else if(phoneNumberRegex.test(this.phoneNumber) == false){
          this.message = "Phone number doesn't meet the requirements!"
        }
        else{
          this.workerService.addWorker(this.firstname,this.lastname,this.email,this.phoneNumber,this.specialization,this.agencyUnder).subscribe((resp)=>{
            alert('Worker added!')
            this.router.navigate(['adminWorkers',{agencyUsername:this.agencyUnder}])
          })

        }
      }
      else{
        this.message = "Worker already added!"
      }
    })
  }

  back(){
    this.router.navigate(['adminWorkers',{agencyUsername:this.agencyUnder}])
  }

}
