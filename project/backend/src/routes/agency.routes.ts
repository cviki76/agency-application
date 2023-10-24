import express from 'express'
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/getAllAgencies').get(
    (req, res)=>new AgencyController().getAllAgencies(req, res)
)


agencyRouter.route('/addComment').post(
    (req, res)=>new AgencyController().addComment(req, res)
)

agencyRouter.route('/changeComment').post(
    (req, res)=>new AgencyController().changeComment(req, res)
)

agencyRouter.route('/deleteComment').post(
    (req, res)=>new AgencyController().deleteComment(req, res)
)


export default agencyRouter;