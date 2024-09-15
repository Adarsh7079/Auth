import mongoose,{Schema,Document} from "mongoose";


export interface Message extends Document{
    content:string;
    createdAt:Date;
}


export interface User extends Document{
    name:string;
    email:string;
    password:string,
    googleId:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
}
const UserSchema:Schema<User> =new Schema({
   name :{
        type:String,
        required:[true,"username is required"],
        trim:true,
        unique:true
    },
   email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:[
            /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,'please use a valid email address']
    },
    password:{
        type:String,
        select:false
    },
    // verifyCode:{
    //     type:String,
    //     required:[true,"verifycode  is required"],
    // },
    // verifyCodeExpiry:{
    //     type:Date,
    //     required:[true,"verifycodeExpiry  is required"],
    // },
    // isVerified:{
    //     type:Boolean,
    //     default:false
    // }
    // googleId:{
    //     type:String
    // }
})

const UserModel=(mongoose.models?.auth as mongoose.Model<User>)
||mongoose.model<User>("auth",UserSchema)

export default UserModel