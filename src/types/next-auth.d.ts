import 'next-auth'


declare module 'next-auth'{
    interface User{
        _id?:string,
        isVerified?:boolean,
        username?:string
    }
    interface Session{
        user:{
            _id?:string,
            username?:string,
            isVerified?:boolean,
        }& DefaulSession['user']
    } 
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string,
        isVerified?:boolean,
        username?:string
    }
}