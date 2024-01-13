'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const FieldValuesSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(6,{message: "Length of the password should be 6"})
})

type FieldValues = z.infer<typeof FieldValuesSchema>


export default function SignIn() {
  const { data: session} = useSession();

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) =>{
    const {username, password} = data;
    try{
    const promise = await axios.post('http://localhost:9000/signin',{
     username,
     password
    })
    await signIn('credentials',{
      username,
      password,
      callbackUrl: '/'
    })
    } catch(error){
      setError(true);

    }
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
    <form className="flex flex-col w-1/4 p-10 shadow-lg shadow-black gap-3" onSubmit={handleSubmit(onSubmit)}>
    <div className="font-bold text-4xl mx-auto">Sign in</div>
      <input
        className="bg-transparent border-b-2 border-white text-white p-2 mb-2 focus:outline-none focus:border-blue-500"
        placeholder="Username"
        {...register("username", { required: "Email is required" })}
      />
      {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}

      <input
        className="bg-transparent border-b-2 border-white text-white p-2 mb-2 focus:outline-none focus:border-blue-500"
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

      <input
        type="submit"
        value="Sign In"
        className="border-2 text-black p-2 cursor-pointer mt-2 bg-white rounded"
      />
      {error && <div className="text-red-500 text-sm">User Not Exist</div>}
      <div className="mx-auto mt-3">Don't have an account? {<Link className="cursor-pointer text-blue-500" href="signup">Sign up</Link>}</div>
    </form>
  </div>
)
}