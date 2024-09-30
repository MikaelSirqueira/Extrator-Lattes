import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes"

const app = Fastify({ logger: true })

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({message: error.message})
})

app.register(cors);
app.register(routes);

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP Server Running!')
})