'use client'
import { signOut, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, useMemo} from "react"
import axios from "axios"
import Image from "next/image"
import logo from "@/public/TalkFlow.png"
import { io } from "socket.io-client"
interface Props{
    receiver: string;
}
interface Message{
    _id: number,
    sender: string,
    receiver: string,
    text: string
}
type Inputs = {
    message: string,
};

export default function ChatBox({receiver}: Props){
 const [allMessages, setAllMessages] = useState<any>([])
 const [newMessage, setNewMessage] = useState('')
 const {data: session} = useSession();
 const {register, handleSubmit, resetField} = useForm<Inputs>({
    defaultValues:{
        message:''
    }
 });

 const socket = useMemo(
    ()=> io('http://localhost:8800')
    ,[]);

useEffect(()=>{
    socket.emit('new-user-connected',{
        username: session?.user?.name
    })
},[session?.user?.name])

 //send messages
 useEffect(()=>{
    async function sendMessages() {
        if(receiver.length!=0 && newMessage.length!=0){
            try{
             const promise = await axios.post('http://localhost:9000/sendMessage',{
                sender:session?.user?.name,
                receiver,
                text: newMessage
             })
            }catch(e){
                console.log(e);
            }
        }
    }
sendMessages()
socket.emit('send-message',{
    user: receiver,
    message: newMessage
})
},[newMessage])

//get instant message
useEffect(()=>{
socket.on('receive-message',(data)=>{
    setAllMessages((prevMessages: Message[]) => [
        ...prevMessages,
        {
            sender: receiver,
            receiver: data.user,
            text: data.message
        }
    ]);

})
},[])

 // get all messages
 useEffect(()=>{
    async function getMessages() {
        if(receiver.length!=0){
            try{
                const {data} = await axios.post('http://localhost:9000/getMessages',{
                    sender: session?.user?.name,
                    receiver
                })
                setAllMessages(data)
            }catch(e){
                console.log(e)
            }

        }
    }
    getMessages()
 },[receiver])

 const handleMessage: SubmitHandler<Inputs> = async (data)=>{
setNewMessage(data.message)
setAllMessages((prevMessages: Message[]) => [
    ...prevMessages,
    {
        sender: session?.user?.name,
        receiver,
        text: data.message
    }
])
resetField('message')

 }


    return(
        <div className="flex flex-col w-screen h-screen relative">
            <Image src={logo} alt="logo" className="-z-10 w-52 h-52 rounded-lg opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        <div className="bg-neutral-900 w-full h-10 flex justify-end items-center border-b pr-4">
            <div className="cursor-pointer hover:bg-neutral-800 p-1 rounded-md" onClick={()=>signOut()}>Log Out</div>
        </div>
        <div className="w-full h-full flex flex-col overflow-y-scroll">
            {allMessages.length>0 &&(
                allMessages.map((message:Message,index:number,)=>{
                    return(
                        <div key={index}
                        className={`${
                          message.sender === session?.user?.name ? 'ml-auto' : 'mr-auto'
                        } max-w-md mb-2 p-2 rounded-lg ${
                          message.sender === session?.user?.name ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                        }`}>{message.text}</div>
                    )
                })
            )}

        </div>
        {receiver && <form onSubmit={handleSubmit(handleMessage)} className="w-full relative flex items-center">
            <input
                type="text"
                {...register('message')}
                className="w-full bg-neutral-900 focus:outline-none px-3 h-12"
                placeholder="Type a message"
            />
            <button
                type="submit"
                className="absolute right-4 rounded hover:bg-neutral-800 p-2"
            >
                Send
            </button>
        </form>}
        </div>
    )
}