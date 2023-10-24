import express from 'express'
import JobModel from '../models/job'
import UserModel from '../models/user'

export class JobController{
    
    
    finishJob = (req: express.Request, res: express.Response)=>{
        let agencyUsername = req.body.agencyUsername;
        let objAddress = req.body.objAddress

        JobModel.findOneAndUpdate({'agencyUsername':agencyUsername,'objectAddress':objAddress},{$set:{"status":"finished"}},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    paintRoom = (req: express.Request, res: express.Response)=>{
        let clientUsername = req.body.clientUsername;
        let objectAddress = req.body.objectAddress
        let roomX = req.body.roomX
        let roomColour = req.body.roomColour

        UserModel.findOne({"username":clientUsername},(err,client)=>{
            if (err) console.log(err);
            else{
            
            let objects = []
            let objectToAdd = null
            for (let obj of client.objects){
                if (obj.address == objectAddress){
                    let rooms = []
                    let roomToAdd = null
                    for(let room of obj.rooms){
                        if(room.roomX == roomX){
                            room.colour = roomColour
                            roomToAdd = room
                        }else{
                            rooms.push(room)
                    }      
                }
                rooms.push(roomToAdd)
                obj.rooms = rooms
                objectToAdd = obj
            }else{
                objects.push(obj)
            }    
            }
            objects.push(objectToAdd)
            UserModel.findOneAndUpdate({"username":clientUsername},{$set:{"objects":objects}},(error,resp)=>{
                if (error) console.log(error);
                else res.json({"message":"ok"})
            })
        }       
        })
    }

    getAllJobs = (req: express.Request, res: express.Response)=>{
        JobModel.find((err,jobs)=>{
            if (err) console.log(err);
            else res.json(jobs)
        })
    }

    declineBid = (req: express.Request, res: express.Response)=>{
        let agencyUsername = req.body.agencyUsername;
        let objAddress = req.body.objAddress

        JobModel.findOneAndDelete({'agencyUsername':agencyUsername,'objectAddress':objAddress},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    acceptBid = (req: express.Request, res: express.Response)=>{
        let agencyUsername = req.body.agencyUsername;
        let objAddress = req.body.objAddress

        JobModel.findOneAndUpdate({'agencyUsername':agencyUsername,'objectAddress':objAddress},{$set:{"status":"active"}},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    declineOffer = (req: express.Request, res: express.Response)=>{
        let agencyUsername = req.body.agencyUsername;
        let objAddress = req.body.objAddress

        JobModel.findOneAndUpdate({'agencyUsername':agencyUsername,'objectAddress':objAddress},{$set:{"status":"declined"}},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    acceptOffer = (req: express.Request, res: express.Response)=>{
        let agencyUsername = req.body.agencyUsername;
        let objAddress = req.body.objAddress
        let bid = req.body.bid
        console.log(agencyUsername)
        console.log(objAddress)
        JobModel.findOneAndUpdate({'agencyUsername':agencyUsername,'objectAddress':objAddress},{$set:{"status":"accepted","bid":bid}},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    addJob = (req: express.Request, res: express.Response)=>{

        let job = new JobModel(JSON.parse(req.body.job))

        job.save((err,resp)=>{
            if (err){
                console.log(err)
                res.status(400).json({'message':"error"})
            }
            else res.json({"message":"ok"})
        })
    }

    getObjectFromObjectAddress = (req: express.Request, res: express.Response)=>{
        let clientUsername = req.body.clientUsername;
        let objectAddress = req.body.objectAddress;

        UserModel.findOne({"username":clientUsername},(err,client)=>{
            if (err) console.log(err);
            else
            for (let obj of client.objects){
                if (obj.address == objectAddress){
                    return res.json(obj)
                }
            }            
        })
    }

    getJobsForClient = (req: express.Request, res: express.Response)=>{

        let username = req.body.username

        JobModel.find({"clientUsername":username},(err,jobs)=>{
            if (err) console.log(err);
            else res.json(jobs)
        })
    }

    getJobsForAgency = (req: express.Request, res: express.Response)=>{

        let username = req.body.username

        JobModel.find({"agencyUsername":username},(err,jobs)=>{
            if (err) console.log(err);
            else res.json(jobs)
        })
    }

}