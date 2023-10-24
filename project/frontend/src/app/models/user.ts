import { Comment } from "./comment";
import { Object } from "./object";

export class User{
    id: Number;
    username: string;
    password: string;
    type:string;
    phoneNumber:string;
    email:string;
    firstname:string;
    lastname:string;
    agencyName:string;
    address:string;
    idNumber:string;
    description:string;
    approved:Number;
    photoString:string;
    objects:Array<Object>
    comments:Array<Comment>
}