import db from '../db/db';
import {IUserdata,IUpdateUserdata} from '../utils/Interfaces'

import app from '../..';
import { MysqlError } from 'mysql';

export default class UserModel{

    private dbName:string = "users";

    destroy(){
        db.end();
    }

    async getUsers(){   
        return new Promise(async (resolve,reject)=>{
            db.query(`select * from ${this.dbName}`,(err:MysqlError,result:any)=>{
                if(err) return reject(err);
                resolve(result)
            })
        }).then(data => data)
        .catch(err => {error:err})

        
    }

    async getUsersBy(by:string,value:number|string){   
        return new Promise(async (resolve,reject)=>{
            db.query(`select * from ${this.dbName} where ${by}=${db.escape(value)};`,(err:MysqlError,result:any)=>{
                if(err) return reject(err);
    
                resolve(result)
            })
        }).then(data => data)
        .catch(err => {error:err})

        
    }

    async createUser(data:IUserdata){
        return new Promise(async (resolve,reject)=>{

            //User already exists?
            if((await this.getUsersBy('username',data.username) as any[]).length){
                reject({errorMsg:'User already exists',where:"username"})
                return;
            }
     
            
            //Email already exists?
            if((await this.getUsersBy('email',data.email) as any[]).length){
                reject({errorMsg:'Email already registered',where:'email'})
                return;
            }
            
            

            let hashedPassword = await app.bcrypt.hash(data.password);
            

            db.query(`insert into ${this.dbName} values(null,${db.escape(data.username)},${db.escape(hashedPassword)},${db.escape(data.email)})`,(err:MysqlError,result:any)=>{
                if(err) return reject(err);
                resolve({...result,content:{...data,password:hashedPassword,id:result.insertId}})
            })
        }).then(data => data)
        .catch(err => err)
    }

    async deleteUser(id:number){
        return new Promise(async (resolve,reject)=>{
            db.query(`delete from ${this.dbName} where id=${db.escape(id)}`,(err:MysqlError,result:any)=>{
                if(err) return reject(err);
    
                resolve(result)
            })
        }).then(data => data)
        .catch(err => {error:err})
    }

    async updateUser(data:IUpdateUserdata, id:number){
        return new Promise(async (resolve,reject)=>{

            //Build query
            let query:string = `update ${this.dbName} set `;
            Object.keys(data).map((key)=>{
                query+=`${key}=${db.escape(data[key as keyof IUpdateUserdata])} `
            })
            query += `where id=${db.escape(id)}`

        console.log(query)
            db.query(query,(err:MysqlError,result:any)=>{
                if(err) return reject(err);
    
                resolve(result)
            })
           
        }).then(data => data)
        .catch(err => {error:err})
    }

}