import express from 'express'
import { Request, Response } from 'express'
import Message from '../models/message'
const router = express.Router()
router.post('/getMessages',async (req:Request,res:Response)=>{
try{
const {sender, receiver} = req.body
const Messages = await Message.find({$or:[{sender,receiver},{sender:receiver, receiver:sender}]});
res.status(201).send(Messages)
}catch(e){
    res.status(401).send("something went wrong")
}
})
export default router;