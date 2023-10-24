import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AgencyService } from '../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  constructor(private userService:UserService,private agencyService:AgencyService,private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("usernameLoggedIn") !== null) {
      this.userFlag = true;
    }
    this.agencyService.getAllAgencies().subscribe((users:User[])=>{
      this.agencies = users
      this.allAgencies = users
    })
  }
  userFlag:boolean;
  allAgencies:User[]
  agencies: User[]
  sPaddress:string;
  sPname:string;
  sortFlag:number = -1;
  descFlag:number = -1;

  go(userName){
    this.router.navigate(['agencyComments',{username:userName}])
  }
  
  askForCooperation(agencyUsername){
    this.router.navigate(['formForCooperation',{agencyUsername:agencyUsername}])
  }

  getImageSrc(username){
    alert(username)
    this.userService.getUser(username).subscribe((user:User)=>{
      if(user.photoString)
      return user.photoString;
      else
      return '../assets/defaultAgency.png'
    })
    
  }

  search(){
    this.agencies = this.allAgencies
    if(this.sPname !== undefined)
    this.agencies =  this.allAgencies.filter(book => book.agencyName.includes(this.sPname))
    if(this.sPaddress !== undefined)
    this.agencies =  this.agencies.filter(book => book.address.includes(this.sPaddress))
    if(this.sPaddress === undefined && this.agencies === undefined)
      this.agencies = this.allAgencies
  }

  sortByAgencyName(){
    this.agencies.sort((agency1,agency2)=>{
      if(agency1.agencyName < agency2.agencyName){
        return this.sortFlag;
      }
      else{
        if (agency1.agencyName == agency2.agencyName){
          return 0;
        }
        else 
        return this.sortFlag * -1;
      }
    })

    this.sortFlag = this.sortFlag * -1
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  sortByDescription(){
    this.agencies.sort((agency1,agency2)=>{
      if(agency1.description < agency2.description){
        return this.descFlag;
      }
      else{
        if (agency1.description == agency2.description){
          return 0;
        }
        else 
        return this.descFlag * -1;
      }
    })

    this.descFlag = this.descFlag * -1
  }

  back(){
    if (this.userFlag == true){
      this.router.navigate(['client'])
    }
    else
      this.router.navigate([''])
  }
  
}
