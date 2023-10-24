import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-client-objects',
  templateUrl: './client-objects.component.html',
  styleUrls: ['./client-objects.component.css']
})
export class ClientObjectsComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.init()
  }
  init(){
    this.userService.getUser(localStorage.getItem('usernameLoggedIn')).subscribe((user:User)=>{
      this.user = user
    })
  }
  user:User

  addObject(){
    this.router.navigate(['addObjectForm']);
  }

  preview(object){
    this.router.navigate(['canvas',{obj:JSON.stringify(object),clientFlag:1}])
  }

  delete(object){
    this.userService.deleteObject(localStorage.getItem('usernameLoggedIn'),object.address).subscribe((resp)=>{
      this.init()
    })
  }

  back(){
    this.router.navigate(['client'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
