import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { DefaultBase64 } from '../shared/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  email: string;
  type: string;
  firstname: string;
  lastname:string;
  agencyName:string;
  address:string;
  idNumber:string;
  description:string;
  message: string;
  photoString:string;

  file: File;

  back(){
    this.router.navigate([''])
  }

  onChange(event): void {
    this.file = event.target.files[0];
    console.log(this.file.size);
  
    const image = new Image();
    image.onload = () => {
      const width = image.width;
      const height = image.height;
  
      if (width >= 100 && height >= 100 && width <= 300 && height <= 300) {
        this.readFileAsBase64(this.file);
      } else {
        alert("Invalid file dimensions. Please choose an image between 100x100 and 300x300 pixels.");
      }
    };
  
    image.src = URL.createObjectURL(this.file);
  }

  readFileAsBase64(file: File): void {
    const reader = new FileReader();
  
    reader.onload = (event: any) => {
      this.photoString = event.target.result;
    };
  
    reader.readAsDataURL(file);
  }

  register(){
    if(this.photoString == null){
      this.photoString = DefaultBase64
    }

    const phoneNumberRegex = /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{6,11}$/;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    this.userService.getUser(this.username).subscribe((user:User)=>{
      if (user == null){
        if(this.confirmPassword != this.password){
          this.message = 'Passwords do not match!'
        }
        else if(emailRegex.test(this.email) == false){
          this.message = "Email doesn't meet the requirements!"
        }
        else if(phoneNumberRegex.test(this.phoneNumber) == false){
          this.message = "Phone number doesn't meet the requirements!"
        }
        else if(passwordRegex.test(this.password) == false){
          this.message = "Password doesn't meet the requirements!"
        }
        else{
          this.userService.register(this.username, this.password, this.phoneNumber, this.email, this.type,this.firstname, this.lastname, this.agencyName, this.address, this.idNumber,this.description,this.photoString).subscribe(respObj=>{
            if(respObj['message']=='ok'){
              alert('User added for registration!')
              this.router.navigate([''])
            }
            else{
              this.message = 'Error!'
            }
          });
        }
      }else{
        this.message = "User already exists!";
      }
    })




    
    
    
    
  }

}
