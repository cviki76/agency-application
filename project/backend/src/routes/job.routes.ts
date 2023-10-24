import express from 'express'
import { JobController } from '../controllers/job.controller';

const jobRouter = express.Router();


jobRouter.route('/addJob').post(
    (req, res)=>new JobController().addJob(req, res)
)

jobRouter.route('/getJobsForClient').post(
    (req, res)=>new JobController().getJobsForClient(req, res)
)

jobRouter.route('/getJobsForAgency').post(
    (req, res)=>new JobController().getJobsForAgency(req, res)
)

jobRouter.route('/getAllJobs').get(
    (req, res)=>new JobController().getAllJobs(req, res)
)

jobRouter.route('/getObjectFromObjectAddress').post(
    (req, res)=>new JobController().getObjectFromObjectAddress(req, res)
)

jobRouter.route('/acceptOffer').post(
    (req, res)=>new JobController().acceptOffer(req, res)
)

jobRouter.route('/declineOffer').post(
    (req, res)=>new JobController().declineOffer(req, res)
)

jobRouter.route('/acceptBid').post(
    (req, res)=>new JobController().acceptBid(req, res)
)

jobRouter.route('/declineBid').post(
    (req, res)=>new JobController().declineBid(req, res)
)

jobRouter.route('/paintRoom').post(
    (req, res)=>new JobController().paintRoom(req, res)
)

jobRouter.route('/finishJob').post(
    (req, res)=>new JobController().finishJob(req, res)
)

export default jobRouter;