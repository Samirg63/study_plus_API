
//User interfaces
export interface IUserdata{
    username:string,
    password:string,
    email:string
}

export interface IUpdateUserdata{
    username?:string,
    password?:string,
    email?:string
}

//Auth interfaces

interface IAuthBase{
    password:string;
}

export interface IUserAuthData extends IAuthBase{
    username:string,
    email?:never
}

export interface IEmailAuthData extends IAuthBase{
    email:string,
    username?:never
}