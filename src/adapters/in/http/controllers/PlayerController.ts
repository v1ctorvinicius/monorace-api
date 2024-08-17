import PlayerUC from "@/domain/ports/in/PlayerUC";
import { Request, Response } from "express";

import PlayerService from "@/domain/services/PlayerService";
const playerUC: PlayerUC = new PlayerService();

export async function getPlayerById(req: Request, res: Response) {
  const playerId = req.params.id;
  const player = await playerUC.getPlayerByEmail(playerId);
  res.status(200).json({ message: "get player by id" });
}
