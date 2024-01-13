import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


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
                    username: credentials.username,
                }
               }
            },

        })

    ],
    pages:{
        signIn: '/signup',
    }
}

const handler = NextAuth(
    authOptions
)

export { handler as GET, handler as POST }