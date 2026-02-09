import { FastifyInstance } from "fastify";
import UserController from "../controllers/UserController";

let Controller= new UserController()

export default function userRoutes(app:FastifyInstance,opts:any,done:any){
    app.get('/',Controller.getUsers);
    app.get('/:by/:value',Controller.getUsersBy);
    app.post('/',Controller.createUser);
    app.put('/:id',Controller.editUser);
    app.delete('/:id',Controller.deleteUser)

    done()
}