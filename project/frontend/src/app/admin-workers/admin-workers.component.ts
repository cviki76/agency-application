import { Component, OnInit } from '@angular/core';
import { Worker } from '../models/worker';
import { WorkerService } from '../services/worker.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.css']
})
export class AdminWorkersComponent implements OnInit {

  constructor(private workerService:WorkerService,private route:ActivatedRoute,private router:Router) { }

  workers:Worker[];

  ngOnInit(): void {
    this.init()
  }

  init(){
    this.workerService.getWorkersForAgency(this.route.snapshot.paramMap.get('agencyUsername')).subscribe((workers:Worker[])=>{
      this.workers = workers
    })
  }

  update(email){

  }
  delete(email){

  }

  addWorker(){
    this.router.navigate(['createWorker',{agencyUsername:this.route.snapshot.paramMap.get('agencyUsername')}])
  }
  
  back(){
    this.router.navigate(['adminUsers'])
  }

  logout(){
    this.router.navigate([''])
  }

}
