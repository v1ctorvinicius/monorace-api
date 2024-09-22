import PlayerUC from "@/domain/ports/in/PlayerUC";
import { PlayerServices } from "@/domain/services/PlayerServices";
import { FastifyRequest, FastifyReply } from "fastify";

class PlayerController {
  private playerUC: PlayerUC;

  constructor() {
    this.playerUC = new PlayerServices();
  }

  public async getPlayerById(req: FastifyRequest, res: FastifyReply) {
    const playerId = req.params.id;

    res.send("Get player by id " + playerId);
    // const playerId = req.params.id;
    // try {
    //   const player = await this.playerUC.getPlayerById(playerId);
    //   res.status(200).send(player);
    // } catch (error) {
    //   res.status(500).send({ error: "Internal Server Error" });
    // }
  }

  public async getPlayerByEmail(req: FastifyRequest, res: FastifyReply) {
    // const email = req.query.email as string; // Cast para string, já que query pode ser string ou undefined
    // try {
    //   const player = await this.playerUC.getPlayerByEmail(email);
    //   res.status(200).send(player);
    // } catch (error) {
    //   res.status(500).send({ error: "Internal Server Error" });
    // }
  }

  public async createPlayer(req: FastifyRequest, res: FastifyReply) {
    // const request = req.body;
    // try {
    //   const player = await this.playerUC.createPlayer(request);
    //   res.status(201).send(player);
    // } catch (error) {
    //   console.error("error: ", error);
    //   res.status(500).send({ error: "Internal Error" });
    // }
  }
}

export default new PlayerController();
