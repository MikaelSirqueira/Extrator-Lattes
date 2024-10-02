import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUsersController } from "./controllers/GetUsersController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetUserController } from "./controllers/GetUserController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    })

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUsersController().handle(request, reply)
    })

    fastify.delete("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply)
    })

    fastify.get("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request, reply)
    })
}