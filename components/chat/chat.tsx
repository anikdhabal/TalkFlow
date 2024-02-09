'use client'
import Discussion from '@/components/chat/Discussion'
import ChatBox from '@/components/chat/ChatBox'
import { useState } from 'react';
export default function Chat(){
    const [receiver, setReceiver] = useState<string>('');

    function setUser(user:string){
    setReceiver(user)
    }

    return(
        <div className='flex'>
        <Discussion setUser={setUser}/>
        <ChatBox receiver={receiver}/>
        </div>
    )
}