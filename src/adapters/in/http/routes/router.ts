import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import PlayerController from "@/adapters/in/http/controllers/PlayerController";

export default async function router(fastify: FastifyInstance) {
  fastify.get("/players/:id", (req, res) => PlayerController.getPlayerById(req, res));
  fastify.get("/players/email/:email", (req, res) => PlayerController.getPlayerByEmail(req, res));
  fastify.post("/players", (req, res) => PlayerController.createPlayer(req, res));
}