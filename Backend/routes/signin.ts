import User from "../models/user";
import express from 'express'
import { Request, Response } from "express";
interface Input{
    username: string,
    password: string
}

const router = express.Router();

router.post('/signin', async(req: Request, res: Response)=>{
     const {username, password}: Input = req.body;

     const user = await User.findOne({username, password});
     if(user){
      res.status(201).send("Logged in successfully");
     }
     else{
        res.status(401).send("User not Exist");
     }
})

export default router;