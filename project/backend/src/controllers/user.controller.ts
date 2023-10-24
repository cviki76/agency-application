import express from 'express'
import UserModel from '../models/user'

export class UserController{

       
    deleteObject = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let objectAddress = req.body.objectAddress;
        UserModel.findOne({'username':username},(error,user)=>{
            if (error) console.log(error);
            else 
                {   
                    let filteredArray = user.objects.filter(obj => obj.address !== objectAddress)
                    UserModel.updateOne({"username":username},{$set:{"objects":filteredArray}},(error,resp)=>{
                        if (error) console.log(error);
                        else res.json({"message":"ok"})
                    })
                }
            
        });
    }

    addObject = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let object = req.body.object;
        console.log(object.type)
        UserModel.findOne({'username':username},(error,user)=>{
            if (error) console.log(error);
            else 
                {
                    let objects = user.objects;
                    objects.push(object)
                    UserModel.updateOne({"username":username},{$set:{"objects":objects}},(error,resp)=>{
                        if (error) console.log(error);
                        else res.json({"message":"ok"})
                    })
                }
            
        });
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let newPassword = req.body.newPassword;

        console.log(username)
        UserModel.findOneAndUpdate({'username':username},{$set:{"password":newPassword}},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    getUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.findOne({'username':username},(error,user)=>{
            if (error) console.log(error);
            else 
                return res.json(user)
            
        });
    }

    declineUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        console.log(username)
        UserModel.findOneAndUpdate({'username':username},{$set:{"approved":-1}},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    deleteUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.findOneAndDelete({'username':username},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    
    acceptUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        console.log(username)
        UserModel.findOneAndUpdate({'username':username},{$set:{"approved":1}},(error,resp)=>{
            if (error) console.log(error);
            else res.json({"message":"ok"})
        });
    }

    getAllUsers = (req: express.Request, res: express.Response)=>{
        
        UserModel.find((error,users)=>{
            if (error) console.log(error);
            else res.json(users)
        });
    }


    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
        UserModel.findOne({'username':username, 'password':password},(error,user)=>{
            if (error) console.log(error);
            else res.json(user)
        });
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = null
        if (req.body.type == "client"){
                user = new UserModel({
                username: req.body.username,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                type: "client",
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                photoString: req.body.photoString,
                approved:0    
            })
        }else if(req.body.type == "agency"){
                user = new UserModel({
                username: req.body.username,
                password: req.body.password,
                type: "agency",
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                agencyName: req.body.agencyName,
                address: req.body.address,
                idNumber: req.body.idNumber,
                description: req.body.description,
                photoString: req.body.photoString,
                approved:0
            })
        }

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
}