import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    localStorage.clear()
  }

  username: string;
  password: string;
  message: string;



  login(){
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB!=null && userFromDB.approved == 1){
        localStorage.setItem('usernameLoggedIn',userFromDB.username)
        if(userFromDB.type == "client"){
          this.router.navigate(['client']);       
        }
        else if(userFromDB.type == "agency"){
          this.router.navigate(['agency']);  
        }
        else{
          this.message = "Error!"
        }      
    }else{
      this.message = "Wrong username or password!"
    }
  })  
  }

  goAsGuest(){
    this.router.navigate(['agencies']);  
  }

}
