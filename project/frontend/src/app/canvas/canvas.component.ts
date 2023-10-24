import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Object } from '../models/object';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router) { }


  @ViewChild('canvas',{static:true}) myCanvas! :ElementRef;
  ngOnInit(): void {
    this.object = JSON.parse(this.route.snapshot.paramMap.get('obj'))
    this.clientFlag = +this.route.snapshot.paramMap.get('clientFlag')
    this.jobsFlag = +this.route.snapshot.paramMap.get('jobsFlag')
    this.adminFlag = +this.route.snapshot.paramMap.get('adminFlag')
    this.canvasWidth = this.object.squareF * 5;
    this.canvasHeight = this.canvasWidth;
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
  }

  #drawRectangle(context:CanvasRenderingContext2D,x,y,width,height){
    context.beginPath();
    context.strokeStyle = "black";
    context.rect(x, y, width, height);
    context.stroke();
  }

  
  object:Object
  clientFlag:number;
  jobsFlag:number;
  adminFlag:number;
  canvasWidth:number;
  canvasHeight:number;
  doorHeight = 15;
  doorWidth = 10;

  back(){
    if(this.clientFlag == 1 && this.jobsFlag == 1)
    this.router.navigate(['jobs'])
    else if(this.clientFlag == 1)
    this.router.navigate(['clientObjects'])
    else if(this.adminFlag == 1)
    this.router.navigate(['adminJobs'])
    else
    this.router.navigate(['jobsAgency',{agencyUsername:this.route.snapshot.paramMap.get('agencyUsername')}])
  }


  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
