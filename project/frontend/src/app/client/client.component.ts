import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) { }


  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('usernameLoggedIn')).subscribe((user:User)=>{
      this.user = user
    })
  }

  // getImageSrc(): string {
  //   if(this.user.photoString)
  //   return this.user.photoString;
  //   else
  //   return '../assets/defaultClient.jpg'
  // }

  user:User;

  changePassword(){
    this.router.navigate(['changePassword']);
  }


  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
