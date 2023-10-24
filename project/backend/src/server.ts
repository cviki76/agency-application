import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/user.routes';
import agencyRouter from './routes/agency.routes';
import jobRouter from './routes/job.routes';
import workerRouter from './routes/worker.routes';


const app = express();
app.use(cors())
app.use(express.json())
// app.use(express.json({limit:"10mb"}))
// app.use(express.urlencoded({limit:"10mb",extended:true,parameterLimit:5000}))

mongoose.connect('mongodb://127.0.0.1:27017/contracting')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/agency', agencyRouter)
router.use('/job', jobRouter)
router.use('/workers', workerRouter)

app.use('/', router)


app.get('/', (req, res) => res.send('Hello world!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));