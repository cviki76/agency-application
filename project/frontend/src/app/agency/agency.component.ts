import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('usernameLoggedIn')).subscribe((user:User)=>{
      this.user = user
    })
  }

  go(){
    this.router.navigate(['jobsAgency',{"agencyUsername":this.user.username}])
  }
  getImageSrc(): string {
    if(this.user.photoString)
    return this.user.photoString;
    else
    return '../assets/defaultAgency.png'
  }

  user:User;

  changePassword(){
    this.router.navigate(['changePassword']);
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
