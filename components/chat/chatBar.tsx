import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

export default function chatBar(){
    const {data: session} = useSession();
    const [users, setUsers] = useState([])

    useEffect(async ()=>{

       const promise = await axios.get('http://localhost:9000/users',{
        username: session?.user.username
       })
    },[])
    return(
        <div>

        </div>
    )
}