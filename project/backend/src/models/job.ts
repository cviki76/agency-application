import mongoose from "mongoose";

const Schema = mongoose.Schema;

let jobSchema = new Schema({
    timePeriod:{
        type:Number
    },
    agencyUsername:{
        type:String
    },
    objectAddress:{
        type:String
    },
    clientUsername:{
        type:String
    },
    status:{
        type:String
    },
    bid:{
        type:String
    }
})

export default mongoose.model('JobModel',jobSchema,'jobs')