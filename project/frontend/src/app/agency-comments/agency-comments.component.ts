import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Comment } from '../models/comment';
import { AgencyService } from '../services/agency.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agency-comments',
  templateUrl: './agency-comments.component.html',
  styleUrls: ['./agency-comments.component.css']
})
export class AgencyCommentsComponent implements OnInit {

  constructor(private userService:UserService,private agencyService:AgencyService,private route:ActivatedRoute,private router:Router) { }

  userFlag = false
  agency:User
  
  ngOnInit(): void {
    if (localStorage.getItem("usernameLoggedIn") !== null) {
      this.userFlag = true;
    }

    this.userService.getUser(this.route.snapshot.paramMap.get('username')).subscribe((agency:User)=>{
      this.agency = agency
    })
    
  }
  back(){
      this.router.navigate(['agencies'])  
  }
  logout(){
    this.router.navigate([''])
  }

}
