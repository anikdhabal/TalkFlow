'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Avatar from 'react-avatar';

interface User{
    _id:number, 
    username:string
}
interface ChildComponentProps {
    setUser: (data: string) => void;
  }

const Discussion: React.FC<ChildComponentProps> = ({setUser}) => {
    const {data: session} = useSession();
    const [users, setUsers] = useState([])
    const [reciever, setReciever] = useState<string>();


    async function getUsers(){
        try{
        const {data} = await axios.get('http://localhost:9000/users');
       setUsers(data);
    }catch(e){
        console.log(e);
    }

    }

    useEffect(()=>{
       getUsers();
    },[])

    function handleSelect(user:User){
        setReciever(user.username)
        setUser(user.username)

    }
    
    return(
        <div className="h-screen w-[27%] shadow-md bg-neutral-900 flex flex-col items-center border-r justify-between">
            <ul className="w-full flex flex-col items-center divide-y">
            {users.map((user:User)=>{
             if(user.username !== session?.user?.name){
                return(
                    <li onClick={() => handleSelect(user)} key={user._id}
                        className={`w-[95%] h-16 flex items-center gap-3 pl-2 hover:cursor-pointer hover:rounded-md mt-2 hover:bg-neutral-800 
                    ${reciever == user.username && 'bg-neutral-800'}`}>
                        <Avatar round size="40px" name={user.username}/>
                        <div>{user.username.charAt(0).toLocaleUpperCase() + user.username.slice(1)}</div>
                    </li>
                )
             }
            })}
            </ul>
            {session?.user?.name && (<div className="bg-neutral-800 w-full flex items-center h-20 gap-2 pl-2 rounded-md">
            <Avatar round size="40px" name={session?.user?.name ?? ''}/>
            <div>{session.user.name.charAt(0).toLocaleUpperCase() + session.user.name.slice(1)}</div>

            </div>)}

        </div>
    )
}
export default Discussion;