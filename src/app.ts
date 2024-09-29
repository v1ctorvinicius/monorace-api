import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import router from "./adapters/in/http/routes/router";

dotenv.config();

const fastify = Fastify({ logger: true });
const port = Number(process.env.PORT);

function routes() {
  fastify.register(router, { prefix: "/api" });
}

function middleware() {
  fastify.register(cors);

  fastify.addHook("preHandler", async (request, reply) => {
    // Você pode adicionar hooks de middleware aqui
  });
}

async function startApp() {
  middleware();
  routes();

  try {
    await fastify.listen({ port });
    fastify.log.info(`Server running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startApp();
