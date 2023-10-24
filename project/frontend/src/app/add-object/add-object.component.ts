import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Object } from '../models/object';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/room';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router) { }
  canvasWidth:number;
  canvasHeight:number;

  width:number = 100;
  height:number = 100;
  doorHeight = 15;
  doorWidth = 10;
  object:Object;
  count:number = 0;
  turn:number = 1;
  done:boolean = false;

  @ViewChild('canvas1',{static:true}) myCanvas1! :ElementRef;
  @ViewChild('canvas2',{static:true}) myCanvas2! :ElementRef;
  message:string;
  ngOnInit(): void {
    this.object = JSON.parse(this.route.snapshot.paramMap.get('obj'))
    this.canvasWidth = this.object.squareF * 5;
    this.canvasHeight = this.canvasWidth;


    const canvas1: HTMLCanvasElement = this.myCanvas1.nativeElement;
    const context1 = canvas1.getContext('2d');
    const canvas2: HTMLCanvasElement = this.myCanvas2.nativeElement;
    const context2 = canvas2.getContext('2d');
    let self = this
    let image = new Image();
    if(context1){
      self = this
      canvas2.onmousemove = function (evt) {
      if (self.count < 2 * self.object.numberOfRooms){
      canvas1.getContext('2d').clearRect(0, 0, self.canvasWidth, self.canvasHeight);
      var rect = canvas2.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;
      if(self.turn == 1){
      context1.beginPath();
      let idx = Math.floor(self.count / 2)
      let height = self.object.rooms[idx].roomHeight
      let width = self.object.rooms[idx].roomWidth
      context1.strokeStyle = "black";
      context1.rect(x, y - height, width, height);
      context1.stroke(); 
      }else{
        image.onload = ()=> {
          //
          context1.drawImage(image, x, y - 15, self.doorWidth, self.doorHeight);
        }
        image.src = '../assets/door.png'
      }
    }else{
      self.done = true
      canvas1.getContext('2d').clearRect(0, 0, self.canvasWidth, self.canvasHeight);
    }
    };
    this.myCanvas2.nativeElement.addEventListener(
      "click",
      (evt: MouseEvent) => {
        this.message=''
        const pos = this.getMousePos(canvas2, evt);
        if (this.count < this.object.numberOfRooms * 2){
        if (this.turn == 1){
          let idx = Math.floor(this.count / 2)

          let height = this.object.rooms[idx].roomHeight
          let width = this.object.rooms[idx].roomWidth

          if (+pos.y - +height < 0 || +pos.x + +width > this.canvasWidth || this.checkFailed(pos.x,pos.y,+pos.x + +width,+pos.y - +height))
          this.message = 'Out of Bounds! Try again';
          else{           
            this.object.rooms[idx].roomX = pos.x
            this.object.rooms[idx].roomY = pos.y
            this.object.rooms[idx].colour = "white"
            this.#drawRectangle(context2,pos.x,pos.y - height,width,height)
            this.turn = this.turn * -1;
            this.count += 1
          }}
        else{
          let idx = Math.floor(this.count / 2)
          if(pos.x < +this.object.rooms[idx].roomX + +this.object.rooms[idx].roomWidth && pos.x > this.object.rooms[idx].roomX && pos.y == this.object.rooms[idx].roomY){
        image.onload = ()=> {
          //       
          this.object.rooms[idx].doorX = pos.x
          this.object.rooms[idx].doorY = pos.y
          context2.drawImage(image, pos.x, pos.y - 15, this.doorWidth, this.doorHeight);
          this.turn = this.turn * -1;
          this.count += 1
        }
        image.src = '../assets/door.png'
      }else{

      }
      }
    }
      }
    );
  }
  }
  checkFailed(l1x,l1y,r1x,r1y){
    let ret = false
    for(let room of this.object.rooms){
      if (room.roomX !== undefined){
        
        let l2x = room.roomX
        let l2y = room.roomY
        let r2x = +room.roomX + +room.roomWidth 
        let r2y = +room.roomY - +room.roomHeight

        if(l1x == r1x || l1y == r1y || r2x == l2x || l2y == r2y)
        continue
        if (l1x > r2x || l2x > r1x)
        continue
        if (r1y > l2y || r2y > l1y)
        continue

        ret = true

      }
    }
    return ret
  }

  #drawRectangle(context:CanvasRenderingContext2D,x,y,width,height){
    context.beginPath();
    context.strokeStyle = "black";
    context.rect(x, y, width, height);
    context.stroke();
  }


  getMousePos(canvas, evt: MouseEvent): { x: number; y: number } {
    var rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    return { x, y };
  }

  clear(){
    for(let room of this.object.rooms){
      room.doorX = null
      room.doorY = null
      room.roomX = null
      room.roomY = null
    }
    this.count = 0;
    this.done = false;
    this.turn = 1
    this.myCanvas2.nativeElement.getContext('2d').clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  doneF(){
    this.userService.addObject(localStorage.getItem('usernameLoggedIn'),this.object).subscribe((resp)=>{
      this.router.navigate(["clientObjects"])
    })
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  back(){
    this.router.navigate(['addObjectForm'])
  }

}
