import express from 'express';
import signupRoutes from './routes/signup';
import signinRoutes from './routes/signin'
import usersRoutes from './routes/users'
import sendMessage from './routes/sendmessages'
import getMessages from './routes/getmessages'
import mongoose from 'mongoose';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());

app.use('/',signupRoutes)
app.use('/',signinRoutes)
app.use('/',usersRoutes)
app.use('/',sendMessage)
app.use('/',getMessages)

app.listen(9000,()=> console.log("server started in port 9000"))

mongoose.connect("")
