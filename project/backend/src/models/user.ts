import mongoose from "mongoose";

const Schema = mongoose.Schema;

let userSchema = new Schema({
    id:{
        type:Number
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    email:{
        type:String
    },
    type:{
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    agencyName:{
        type:String
    },
    address:{
        type:String
    },
    idNumber:{
        type:String
    },
    description:{
        type:String
    },
    approved:{
        type:Number
    },
    photoString:{
        type:String
    },
    objects:{
        type:Array
    },
    comments:{
        type:Array
    }
})

export default mongoose.model('UserModel',userSchema,'users')