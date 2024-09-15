import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbconnect";
import UserModel from "@/models/user";

export const  authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                username:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try{
                    const user=await UserModel.findOne({ email:credentials.identifier});

                    if(!user){
                        throw new Error('No User Found with this email');
                    }

                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password);
                    if(isPasswordCorrect){
                        return user;
                    }
                    else{
                        throw new Error('Wrong Credentials l');
                    }
                }catch(error:any){
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id=user._id?.toString(),
                token.username=user.username
            }
            return token
        },
        async session({session,token}){

            if(token){
                session.user._id=token._id
                session.user.username=token.username
            }
            return session
        }
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}