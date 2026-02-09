import db from '../db/db'
import {IUserAuthData,IEmailAuthData} from '../utils/Interfaces'

import app from '../..';

export default class AuthModel{

    private dbName:string = "users";

    destroy(){
        db.end();
    }

    async login(data:IUserAuthData|IEmailAuthData){
        return new Promise(async (resolve,reject)=>{

            let key:string = Object.keys(data)[0] !== 'password' ? Object.keys(data)[0] : Object.keys(data)[1]
            let value:string = Object.keys(data)[0] !== 'password' ? data[Object.keys(data)[0] as keyof IUserAuthData]! : data[Object.keys(data)[1] as keyof IUserAuthData]!

            
            db.query(`select * from ${this.dbName} where ${key}=${db.escape(value)}`,async (err:any,result:any)=>{
                

                if(result.length === 0){
                    //User not found
                    reject({errorMsg:"Your credentials are wrong!",where:'login'})
                    return;
                }
                
                if(await app.bcrypt.compare(data.password,result[0].password)){
                    //Do the login
                    resolve(result[0])
                }else{
                    reject({errorMsg:"Your credentials are wrong!",where:'login'})
                    return;
                }
            })

        }).then(data => data)
        .catch(err => err)
    }
}