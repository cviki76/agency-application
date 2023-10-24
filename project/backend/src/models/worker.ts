import mongoose from "mongoose";

const Schema = mongoose.Schema;

let workerSchema = new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    email:{
        type:String
    },
    specialization:{
        type:String
    }, 
    agencyUnder:{
        type:String
    }
})

export default mongoose.model('WorkerModel',workerSchema,'workers')