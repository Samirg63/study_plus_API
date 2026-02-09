import { FastifyInstance } from "fastify";
import AuthController from "../controllers/AuthController";

let Controller = new AuthController()

export default function authRoutes(app:FastifyInstance,opts,done){ 
    app.post('/login',Controller.login);
    app.post('/register',Controller.register);
    app.get('/token',Controller.verifyToken)
    
    done()
}