import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from '../services/agency.service';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comment-and-rate',
  templateUrl: './comment-and-rate.component.html',
  styleUrls: ['./comment-and-rate.component.css']
})
export class CommentAndRateComponent implements OnInit {

  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router,private agencyService:AgencyService) { }
  
  text:string;
  rating:string;
  user:User
  agency:User;
  commented:boolean;
  comment:Comment;

  ngOnInit(): void {
    this.init()
  }

  init(){
    this.commented = false
    this.userService.getUser(localStorage.getItem('usernameLoggedIn')).subscribe((user:User)=>{
      this.user = user
      this.userService.getUser(this.route.snapshot.paramMap.get('agencyUsername')).subscribe((agency:User)=>{
        this.agency = agency
        for(let comment of this.agency.comments){
          if(comment.username == user.username){
            this.commented = true
            this.comment = comment
          }
        }
      })

    })
  }

  addComment(){
    this.agencyService.addComment(this.agency.username,this.user.username,this.text,this.rating).subscribe((resp)=>{
      this.init()
    })
  }

  changeComment(){
    this.agencyService.changeComment(this.agency.username,this.user.username,this.text,this.rating).subscribe((resp)=>{
      this.init()
    })
  }

  deleteComment(){
    this.agencyService.deleteComment(this.agency.username,this.user.username).subscribe((resp)=>{
      this.init()
    })
  }

  back(){
    this.router.navigate(['jobs'])
  }
}
