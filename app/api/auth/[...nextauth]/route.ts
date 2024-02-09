import user from "@/Backend/models/user";
import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import type { Session } from 'next-auth';


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials:{
            username: {label: "Username",type: ""},
            password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials || !credentials.username || !credentials.password){
                    return null;
                }
               else{
                return{
                    id: credentials.username,
                    name: credentials.username,
                }
               }
            },

        })

    ],
    pages:{
        signIn: '/signin',
    }
}

const handler = NextAuth(
    authOptions
)

export { handler as GET, handler as POST }