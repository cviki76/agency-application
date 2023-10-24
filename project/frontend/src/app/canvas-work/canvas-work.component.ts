import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Object } from '../models/object';
import { Room } from '../models/room';
import { JobService } from '../services/job.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-canvas-work',
  templateUrl: './canvas-work.component.html',
  styleUrls: ['./canvas-work.component.css']
})
export class CanvasWorkComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private jobService:JobService) { }

  object:Object
  canvasWidth:number;
  canvasHeight:number;
  doorHeight = 15;
  doorWidth = 10;
  message:string;
  clientUsername :string;
  showFinish:boolean;

  @ViewChild('canvas',{static:true}) myCanvas! :ElementRef;
  ngOnInit(): void {
    this.object = JSON.parse(this.route.snapshot.paramMap.get('obj'))
    this.clientUsername = this.route.snapshot.paramMap.get('clientUsername')
    this.canvasWidth = this.object.squareF * 5;
    this.canvasHeight = this.canvasWidth;
    this.showFinish = false
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');

    for (let room of this.object.rooms){
      let image = new Image();
      image.onload = ()=> {       
        context.fillStyle = room.colour
        context.fillRect(room.roomX,room.roomY - room.roomHeight,room.roomWidth,room.roomHeight)
        this.#drawRectangle(context,room.roomX,room.roomY - room.roomHeight,room.roomWidth,room.roomHeight)
        context.drawImage(image, room.doorX, room.doorY - 15, this.doorWidth, this.doorHeight);
      }
      image.src = '../assets/door.png'
    }


    this.myCanvas.nativeElement.addEventListener(
      "click",
      (evt: MouseEvent) => {
        this.message=''
        const pos = this.getMousePos(canvas, evt);
        console.log(pos.x,pos.y)
        let room = this.checkIfInRoom(pos.x,pos.y)
        if (room != null){
          this.paintRoom(context,room)
          let check = true
          for(let roomF of this.object.rooms){
            if(roomF.colour != "green"){
              check = false
            }
          }
          if (check)
          this.showFinish = true
          else
          this.showFinish = false
        }
      }   
    );
  }

  checkIfInRoom(x,y):Room{
    let rooms = this.object.rooms
    let retRoom = null
    for(let room of rooms){
      if(x > room.roomX && x < +room.roomX + +room.roomWidth && y > room.roomY - +room.roomHeight && y < +room.roomY ){
        console.log("dobar")
        retRoom = room
      }
    }
    return retRoom
  }

  paintRoom(context:CanvasRenderingContext2D,room){
    if(room.colour == "white"){
      room.colour = 'red'
    }else if(room.colour == 'red'){
      room.colour = 'green'
    }
    else if(room.colour = 'green'){
      room.colour = "white"
    }

    this.jobService.paintRoom(this.clientUsername,this.object.address,room.roomX,room.colour).subscribe((resp)=>{
      
    })

    let image = new Image();
      image.onload = ()=> {          
        context.fillStyle = room.colour
        context.fillRect(room.roomX,room.roomY - room.roomHeight,room.roomWidth,room.roomHeight)
        context.drawImage(image, room.doorX, room.doorY - 15, this.doorWidth, this.doorHeight); 
      }       
      image.src = '../assets/door.png'
    }

  #drawRectangle(context:CanvasRenderingContext2D,x,y,width,height){
    context.beginPath();
    context.strokeStyle = "black";
    context.rect(x, y, width, height);
    context.stroke();
  }

  finish(){
    this.jobService.finishJob(this.route.snapshot.paramMap.get('agencyUsername'),this.object.address).subscribe((resp)=>{
    })
    this.router.navigate(['jobsAgency',{agencyUsername:this.route.snapshot.paramMap.get('agencyUsername')}])
  }

  back(){
    this.router.navigate(['jobsAgency',{agencyUsername:this.route.snapshot.paramMap.get('agencyUsername')}])
  }

  getMousePos(canvas, evt: MouseEvent): { x: number; y: number } {
    var rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    return { x, y };
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
