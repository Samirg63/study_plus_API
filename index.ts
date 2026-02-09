import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";

import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/authRoutes";

const app:FastifyInstance = fastify({logger:true})

app.register(fastifyCors,{
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:false
})

app.register(fastifyBcrypt, {
  saltWorkFactor: 12
})

app.register(fastifyJwt,{
    secret:"secret"
})

export default app;

//routes
//todo: Do all te routes in the "src/routes" folder and import them (user app.resgister + prefix)

//test route
app.get('/',(request:FastifyRequest,reply:FastifyReply)=>{
    reply.send({text:'Hello World!'})
})

app.register(userRoutes,{prefix:"/user"})
app.register(authRoutes,{prefix:"/auth"})


//Running server
app.listen({port:3000},(err,address)=>{
    if(err){
        app.log.error(err)
    }

    app.log.info(`Server running on ${(app.server.address()! as any).port}!`)
})