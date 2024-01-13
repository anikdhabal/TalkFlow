'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const FieldValuesSchema = z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6,{message: "Length of the password should be 6"})
})

type FieldValues = z.infer<typeof FieldValuesSchema>


export default function SignUp() {
  const {data: session} = useSession();
  if(session){                                  
    redirect('/')
  }
      
  const [error, setError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(FieldValuesSchema)
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const {username, email, password} = data;

    try{

    const promise = await axios.post('http://localhost:9000/signup',{
      username,
      email,
      password
    })
    console.log(promise.data)
    const res = await signIn('credentials',{
      username,
      password,
      callbackUrl: '/'
    })
  }catch(error){
    setError(true);
  }
    
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
    <form className="flex flex-col w-1/4 p-10 shadow-lg shadow-black gap-3" onSubmit={handleSubmit(onSubmit)}>
    <div className="font-bold text-4xl mx-auto">Sign up</div>
      <input
        className="bg-transparent border-b-2 border-white text-white p-2 mb-2 focus:outline-none focus:border-blue-500"
        placeholder="Username"
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}

      <input
        className="bg-transparent border-b-2 border-white text-white p-2 mb-2 focus:outline-none focus:border-blue-500"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

      <input
        className="bg-transparent border-b-2 border-white text-white p-2 mb-2 focus:outline-none focus:border-blue-500"
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

      <input
        type="submit"
        value="Sign Up"
        className="border-2 text-black p-2 cursor-pointer mt-2 bg-white rounded"
      />
      {error && <div className="text-red-500 text-sm">User Already Exist</div>}
      <div className="mx-auto mt-3">Already have an account? {<Link className="cursor-pointer text-blue-500" href="signin">Sign in</Link>}</div>
    </form>
  </div>
)
}