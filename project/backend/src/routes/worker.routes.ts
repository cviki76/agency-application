import express from 'express'
import { WorkerController } from '../controllers/worker.controller';

const workerRouter = express.Router();

workerRouter.route('/getWorkersForAgency').post(
    (req, res)=>new WorkerController().getWorkersForAgency(req, res)
)

workerRouter.route('/addWorker').post(
    (req, res)=>new WorkerController().addWorker(req, res)
)

workerRouter.route('/getWorker').post(
    (req, res)=>new WorkerController().getWorker(req, res)
)

export default workerRouter;