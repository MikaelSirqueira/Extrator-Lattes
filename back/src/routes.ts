import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserController } from "./controllers/GetUserController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    })

    fastify.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request, reply)
    })
}