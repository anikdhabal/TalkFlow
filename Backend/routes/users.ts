import User from "../models/user";
import express from 'express';
const router = express.Router();
import { Request, Response } from "express";

router.get('/users',async (req: Request,res: Response)=>{

    const users = await User.find({username:{$ne: req.body.username as string}});

    res.status(201).send(users);

})
export default router;