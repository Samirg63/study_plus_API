import { FastifyReply, FastifyRequest } from "fastify";
import { ok,HttpError } from "../utils/httpResponse";
import AuthModel from "../models/AuthModel";
import UserModel from "../models/UserModel";

import {IUserdata, IUserAuthData,IEmailAuthData} from '../utils/Interfaces'


let Auth = new AuthModel()
let User = new UserModel();




export default class AuthController{

    async login(request:FastifyRequest,reply:FastifyReply){
        try {
            let result:any = await Auth.login((request.body as IUserAuthData | IEmailAuthData));

            if(result.errorMsg){
                throw result
            }

            delete result.password;
            const token = await reply.jwtSign({...result})
            

            reply.code(200).send(ok(200,{info:{...result},token:token}))
        } catch (error) {
            if(error.where){
                reply.code(500).send(HttpError(500,error.errorMsg,error.where))
            }
            reply.code(500).send(HttpError(500,error.errorMsg))
        }
        
    }

    async register(request:FastifyRequest,reply:FastifyReply){
        try {
            let result:any = await User.createUser((request.body as IUserdata));
            if(result.errorMsg){
                throw result
            }
            

            delete result.content.password;
            const token = await reply.jwtSign({...result.content})
            
            reply.code(201).send(ok(201,{info:{...result.content},token:token}))
        } catch (error:any) {
             if(error.where){
                reply.code(500).send(HttpError(500,error.errorMsg,error.where))
            }
            reply.code(500).send(HttpError(500,error.errorMsg))
        }


    }

    async verifyToken(request:FastifyRequest,reply:FastifyReply){
        if(await request.jwtVerify()){
            return reply.send(ok(200,{}))
        }else{
            return reply.send(HttpError(401,'unauthorized'))
        }
    }

}