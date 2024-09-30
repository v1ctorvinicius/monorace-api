import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import PlayerController from "@/adapters/in/http/controllers/PlayerController";
import { PlayerServices } from "@/domain/services/PlayerServices";
import { PlayerRepositoryRedisImpl } from "@/adapters/out/db/PlayerRepositoryRedisImpl";
import AuthService from "@/domain/services/AuthService";

const playerRepository = new PlayerRepositoryRedisImpl();
const authService = new AuthService();
const playerServices = new PlayerServices(playerRepository, authService);
const playerController = new PlayerController(playerServices);

//TODO: this is a contract for the controller
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

  fastify.post("/players/login", (req, res) => {
    playerController.playerLogin(req, res);
  });
}
