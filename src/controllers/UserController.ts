import { FastifyReply, FastifyRequest } from "fastify";
import { ok,HttpError } from "../utils/httpResponse";
import UserModel from "../models/UserModel";

import {IUserdata,IUpdateUserdata} from '../utils/Interfaces'


let User = new UserModel()




export default class UserController{
    async getUsers(request:FastifyRequest,reply:FastifyReply){
    
        let result:any = await User.getUsers();

        console.log(result)
        if(result.error){
            reply.code(500).send(HttpError(500,"Server Error!"))
        }


        reply.code(200).send(ok(200,result))
    }

    async getUsersBy(request:FastifyRequest,reply:FastifyReply){
        let result:any = await User.getUsersBy((request.params as any).by,(request.params as any).value);

        if(result.error){
            reply.code(500).send(HttpError(500,"Server Error!"))
        }


        reply.code(200).send(ok(200,result))
    }

    async createUser(request:FastifyRequest,reply:FastifyReply){

        let result:any = await User.createUser((request.body as IUserdata));

        if(result.error){
            reply.code(500).send(HttpError(500,"Server Error!"))
        }


        reply.code(201).send(ok(201,result))
    }

    async editUser(request:FastifyRequest,reply:FastifyReply){
        
        if(!(request.params as any).id) reply.code(406).send(HttpError(406,"A ID is needed"));

        let result:any = await User.updateUser((request.body as IUpdateUserdata),(request.params as any).id);

        if(result.error){
            reply.code(500).send(HttpError(500,"Server Error!"))
        }


        reply.code(200).send(ok(200,result))
    }

    async deleteUser(request:FastifyRequest,reply:FastifyReply){
        //Id check
        if (!(request.params as any).id) reply.code(406).send(HttpError(406,"A ID is needed"));

        let result:any = await User.deleteUser((request.params as any).id);

        if(result.error){
            reply.code(500).send(HttpError(500,"Server Error!"))
        }


        reply.code(200).send(ok(200,result))
    }
}