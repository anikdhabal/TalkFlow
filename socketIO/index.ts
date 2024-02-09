import { Server } from "socket.io";
import express from 'express';
import { createServer } from "http";

const app = express();
const server = createServer(app);

const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000"
  }
});

interface Data{
    socketId:string;
    username: string;
}

let activeUsers:Data[] = []

io.on("connection", (socket) => {
   socket.on('new-user-connected',(user:{username: string})=>{
    if(!activeUsers.some((activeUser)=> activeUser.username == user.username )){
        activeUsers.push({
            socketId: socket.id,
            username: user.username
        })
    }
    console.log(user)
   })

   socket.on('send-message',(data:{user:string, message: string})=>{

    const user = activeUsers.find((user) => user.username === data.user);

    if(user){
      io.to(user.socketId).emit('receive-message',data)
    }
    
   })

   socket.on('disconnect',()=>{
    activeUsers = activeUsers.filter((user)=> user.socketId!=socket.id)
   })
});

const PORT = 8800;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});