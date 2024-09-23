import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import PlayerController from "@/adapters/in/http/controllers/PlayerController";

const playerController = new PlayerController();

export default async function router(fastify: FastifyInstance) {
  fastify.get("/health", () => {
    return "UP";
  });

  fastify.get("/players/:id", (req, res) =>
    playerController.getPlayerById(req, res)
  );

  fastify.get("/players/find-id-by-email", (req, res) =>
    playerController.getPlayerIdByEmail(req, res)
  );

  fastify.post("/players", (req, res) =>
    playerController.signUpPlayer(req, res)
  );
}
