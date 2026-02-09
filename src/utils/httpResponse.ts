export function ok(statusCode:number,body:any){
    return{
        status:statusCode,
        body:body
    }
}

export function HttpError(statusCode:number,errorMsg:string,where?:string){
    return{
        status:statusCode,
        message:errorMsg,
        where:where
    }
}