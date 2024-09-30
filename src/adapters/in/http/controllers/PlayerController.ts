import { Player } from "@/domain/models/Player";
import PlayerUC from "@/domain/ports/in/PlayerUC";
import { PlayerServices } from "@/domain/services/PlayerServices";
import { FastifyRequest, FastifyReply } from "fastify";

export default class PlayerController {
  private playerUC: PlayerUC;

  constructor(playerServices: PlayerServices) {
    this.playerUC = playerServices;
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
      const playerSignUpRequest = req.body as PlayerSignUpRequest;
      const playerSignUpResponse = await this.playerUC.playerSignUp(
        playerSignUpRequest
      );

      if (!playerSignUpResponse) return;

      res.status(201).send(`Welcome, ${playerSignUpResponse?.getUsername()} !`);
    } catch (error: any) {
      if (error.message === "Sorry, email already in use") {
        res.status(409).send(error.message);
      } else {
        console.error("error: ", error);
        res.status(500).send({ error: "Internal Error" });
      }
    }
  }

  public async playerLogin(req: FastifyRequest, res: FastifyReply) {
    try {
      const playerLoginRequest = req.body as PlayerLoginRequest;
      const token = await this.playerUC.playerLogin(
        playerLoginRequest.email,
        playerLoginRequest.password
      );

      if (!token) {
        throw new Error("Invalid credentials");
      }
      res.status(200).send(token);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
}

export interface PlayerSignUpRequest {
  newUsername: string;
  newEmail: string;
  newPassword: string;
}

interface PlayerGetByEmailRequest {
  email: string;
}

interface PlayerLoginRequest {
  email: string;
  password: string;
}
