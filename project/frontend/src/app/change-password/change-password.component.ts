import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('usernameLoggedIn')).subscribe((user:User)=>{
      this.user = user 
    })
  }

  oldPassword:string;
  newPassword:string;
  confirmNewPassword:string;
  
  user: User;
  message:string;
  change(){
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{6,11}$/;
    if(this.oldPassword != this.user.password){
      this.message = "Wrong old password!"
    }
    else if (this.newPassword != this.confirmNewPassword){
      this.message = "Password do not match!"
    }
    else if(passwordRegex.test(this.newPassword) == false){
      this.message = "Password doesn't meet the requirements!"
    }
    else{
      this.userService.changePassword(this.user.username,this.newPassword).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Password changed!')
          this.router.navigate([''])
        }
        else{
          this.message = 'Error!'
        }
      });
    }
  }
  
  back(){
    if(this.user.type == 'client'){
      this.router.navigate(['client'])
    }
    else if(this.user.type == 'agency'){
      this.router.navigate(['agency'])
    }
    else{
      this.router.navigate(['admin'])
    }
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}


