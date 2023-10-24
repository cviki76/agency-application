import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('usernameLoggedIn')).subscribe((user:User)=>{
      this.user = user
    })
  }
  
  user:User;

  back(){
      this.router.navigate(['client'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
