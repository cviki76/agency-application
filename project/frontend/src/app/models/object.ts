import { Room } from "./room";

export class Object{
    type:string;
    address:string;
    numberOfRooms:number;
    squareF:number;
    rooms:Array<Room>
}