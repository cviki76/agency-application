import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)


userRouter.route('/getAllUsers').get(
    (req, res)=>new UserController().getAllUsers(req, res)
)

userRouter.route('/acceptUser').post(
    (req, res)=>new UserController().acceptUser(req, res)
)

userRouter.route('/declineUser').post(
    (req, res)=>new UserController().declineUser(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res)=>new UserController().deleteUser(req, res)
)

userRouter.route('/getUser').post(
    (req, res)=>new UserController().getUser(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)

userRouter.route('/addObject').post(
    (req, res)=>new UserController().addObject(req, res)
)

userRouter.route('/deleteObject').post(
    (req, res)=>new UserController().deleteObject(req, res)
)


export default userRouter;