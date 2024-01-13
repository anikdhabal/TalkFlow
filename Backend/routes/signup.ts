import express from 'express'
import { Request, Response } from 'express';
const router = express.Router()
import User from '../models/user';

interface data{
    username: string,
    email: string,
    password: string
}

router.post('/signup',async (req:Request,res:Response)=>{
const {username, email, password}:data = req.body;

const user = await User.findOne({username});
if(user){
    res.status(401).send("User Already Exist");
}
else{
    const newUser = new User({username, email, password});
    await newUser.save();
    res.status(201).send("Account Created Successfully");
}

})

export default router;