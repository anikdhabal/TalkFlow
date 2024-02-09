import express from 'express'
import { Request, Response } from 'express'
import Message from '../models/message'
const router = express.Router()
router.post('/sendMessage',async (req:Request,res:Response)=>{
try{
const {sender, receiver, text} = req.body
const Messages = new Message({sender, receiver, text})
await Messages.save();
res.status(201).send("message send successfully")
}catch(e){
    res.status(401).send("something went wrong")
}
})
export default router;