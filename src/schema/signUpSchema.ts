import {z} from "zod"

export const usernameValidation=z
.string()
.min(2,"username must be atleast two charectes")
.max(20,"Username must be no more than 20")
        .regex(/^[a-zA-Z0-9_]+$/,"Usename must not contain speccial character")


export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{message:"Password must be atleast 6 chareters "})
})
