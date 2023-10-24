import express from 'express'
import UserModel from '../models/user'


export class AgencyController{

    getAllAgencies = (req: express.Request, res: express.Response)=>{
        
        UserModel.find({"type":'agency'},(error,agencies)=>{
            if (error) console.log(error);
            else res.json(agencies)
        });
    }


    changeComment = (req: express.Request, res: express.Response)=>{
        let usernameAgency = req.body.usernameAgency
        let co = JSON.parse(req.body.comment)
        UserModel.findOne({"username":usernameAgency},(error,agency)=>{
            if (error) console.log(error);
            else {
                for(let comment of agency.comments){
                    if(comment.username == co.username){
                        comment.text = co.text
                        comment.rating = co.rating
                    }
                }
                UserModel.updateOne({"username":usernameAgency},{$set:{"comments":agency.comments}},(error,resp)=>{
                    if (error) console.log(error);
                    else res.json({"message":"ok"})
                })
            }
        });
    }

    deleteComment = (req: express.Request, res: express.Response)=>{
        let usernameAgency = req.body.usernameAgency
        let usernameClient = req.body.usernameClient

        UserModel.findOne({"username":usernameAgency},(error,agency)=>{
            if (error) console.log(error);
            else {
                let filteredArray = agency.comments.filter(obj => obj.username !== usernameClient)
                    UserModel.updateOne({"username":usernameAgency},{$set:{"comments":filteredArray}},(error,resp)=>{
                        if (error) console.log(error);
                        else res.json({"message":"ok"})
                    })
            }
        });
    }


    addComment = (req: express.Request, res: express.Response)=>{
        let usernameAgency = req.body.usernameAgency
        let co = JSON.parse(req.body.comment)
        UserModel.findOne({"username":usernameAgency},(error,agency)=>{
            if (error) console.log(error);
            else {
                let comments = agency.comments
                comments.push(co)
                UserModel.updateOne({"username":usernameAgency},{$set:{"comments":comments}},(error,resp)=>{
                    if (error) console.log(error);
                    else res.json({"message":"ok"})
                })

            }
        });
    }

}