import express from 'express'
import WorkerModel from '../models/worker'


export class WorkerController{

    getWorkersForAgency = (req: express.Request, res: express.Response)=>{
        let agencyUsername = req.body.agencyUsername
        WorkerModel.find({agencyUnder:agencyUsername},(err,workers)=>{
            if (err) console.log(err);
            else res.json(workers)
        })
    }


    getWorker = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;

        WorkerModel.findOne({'email':email},(error,worker)=>{
            if (error) console.log(error);
            else 
                return res.json(worker)
            
        });
    }

    addWorker = (req: express.Request, res: express.Response)=>{
        let worker = null

        worker = new WorkerModel({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            specialization:req.body.specialization,
            agencyUnder:req.body.agencyUnder
        })
        
        worker.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
}