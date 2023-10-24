import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  users:User[]
  message:String;

  ngOnInit(): void {
  }

  changePassword(){
    this.router.navigate(['changePassword']);
  }

  logout(){
    this.router.navigate([''])
  }
}
