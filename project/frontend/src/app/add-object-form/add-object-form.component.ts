import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Object } from '../models/object';
import { Room } from '../models/room';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-object-form',
  templateUrl: './add-object-form.component.html',
  styleUrls: ['./add-object-form.component.css']
})
export class AddObjectFormComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  flag:number  = 0;
  type:string;
  address:string;
  numberOfRooms:number;
  squareFt:number;
  message:string;
  rooms:Array<number> = [];

  width:Array<number>;
  height:Array<number>;
  jsonObject:Object;

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const contents: string = e.target.result;
        this.jsonObject = JSON.parse(contents);
      };
      reader.readAsText(file);
    }
  }

  addJSON(){
    if(this.jsonObject){
    this.userService.addObject(localStorage.getItem('usernameLoggedIn'),this.jsonObject).subscribe((resp)=>{
      alert(resp["message"])
      this.router.navigate(['clientObjects'])
    })
  }
  }

  create(){
    if (this.flag == 0){

      for (let i = 0; i < this.numberOfRooms; i++) {
        this.rooms.push(i + 1)
      }
      this.width = new Array<number>(3).fill(null);
      this.height = new Array<number>(3).fill(null);
      this.flag = 1  
    }
    else{
    let object = new Object()
    object.type = this.type
    object.address = this.address
    object.numberOfRooms = this.numberOfRooms
    object.squareF = this.squareFt
    
    let roomsArray = new Array<Room>;

    for (let i = 0; i < this.numberOfRooms; i++) {
      let room = new Room();
      room.roomWidth = this.width[i]
      room.roomHeight = this.height[i]
      roomsArray.push(room)
    }
    object.rooms = roomsArray
    this.router.navigate(['addObject',{obj:JSON.stringify(object)}])
    }
  }
  back(){
    this.router.navigate(['clientObjects'])
  }

}
