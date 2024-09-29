import { Player } from "@/domain/models/Player";
import PlayerUC from "@/domain/ports/in/PlayerUC";
import { PlayerServices } from "@/domain/services/PlayerServices";
import { FastifyRequest, FastifyReply } from "fastify";

export default class PlayerController {
  private playerUC: PlayerUC;

  constructor() {
    this.playerUC = new PlayerServices();
  }

  public async getPlayerById(req: FastifyRequest, res: FastifyReply) {
    // const playerId = req.params.id;
    // try {
    //   const player = await this.playerUC.getPlayerById(playerId);
    //   res.status(200).send(player);
    // } catch (error) {
    //   res.status(500).send({ error: "Internal Server Error" });
    // }
  }

  public async getPlayerIdByEmail(req: FastifyRequest, res: FastifyReply) {
    const { email } = req.query as PlayerGetByEmailRequest;

    try {
      const playerId = await this.playerUC.getPlayerIdByEmail(email);
      res.status(200).send(playerId);
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  public async signUpPlayer(req: FastifyRequest, res: FastifyReply) {
    try {
      const { newUsername, newEmail, newPassword } =
        req.body as PlayerSignUpRequest;
      const signUpPlayerRequest = Player.create(
        newUsername,
        newPassword,
        newEmail
      );

      const signUpPlayerResponse = await this.playerUC.playerSignUp(
        signUpPlayerRequest
      );

      if (signUpPlayerResponse === null) {
        res.status(409).send("Sorry, email already in use");
        return;
      }

      res.status(201).send(`Welcome, ${signUpPlayerResponse?.getUsername()} !`);
    } catch (error: any) {
      if (error.message === "Sorry, email already in use") {
        res.status(409).send(error.message);
      } else {
        console.error("error: ", error);
        res.status(500).send({ error: "Internal Error" });
      }
    }
  }
}

interface PlayerLoginRequest {
  email: string;
  password: string;
}

interface PlayerSignUpRequest {
  newUsername: string;
  newEmail: string;
  newPassword: string;
}

interface PlayerGetByEmailRequest {
  email: string;
}
