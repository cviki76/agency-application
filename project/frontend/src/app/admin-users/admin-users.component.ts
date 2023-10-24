import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  users:User[]
  message:String;

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users:User[])=>{
      this.users = users
    })
  }

  accept(username){
    this.userService.acceptUser(username).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.userService.getAllUsers().subscribe((users:User[])=>{
          this.users = users
        })
      }
      else{
        this.message = 'Error'
      }
    });
  }

  decline(username){
    this.userService.declineUser(username).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.userService.getAllUsers().subscribe((users:User[])=>{
          this.users = users
        })
      }
      else{
        this.message = 'Error'
      }
    });
  }
  update(user){

  }

  delete(username){
    this.userService.deleteUser(username).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.userService.getAllUsers().subscribe((users:User[])=>{
          this.users = users
        })
      }
      else{
        this.message = 'Error'
      }
    });
  }

  workers(agencyUsername){
    this.router.navigate(['adminWorkers',{agencyUsername:agencyUsername}])
  }

  back(){
    this.router.navigate(['admin'])
  }
  addUser(){
    this.router.navigate(['adminCreateUser']);
  }
  logout(){
    this.router.navigate([''])
  }

}
