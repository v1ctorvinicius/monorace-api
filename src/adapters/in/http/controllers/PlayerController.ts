import PlayerUC from "@/domain/ports/in/PlayerUC";
import {
  getPlayerByIdService,
  getPlayerByEmailService,
  createPlayerService,
} from "@/domain/services/PlayerServices";
import { Request, Response } from "express";

// Definindo explicitamente o tipo da constante
const getPlayerByIdServiceExecute: PlayerUC["getPlayerById"] =
  getPlayerByIdService;

export async function getPlayerById(req: Request, res: Response) {
  const playerId = req.params.id;
  try {
    try {
      const player = await getPlayerByIdServiceExecute(playerId);
      res.status(200).json(player);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getPlayerByEmail(req: Request, res: Response) {
  const email = req.params.email;

  try {
    const player = await getPlayerByEmailService(email);
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createPlayer(req: Request, res: Response) {
  const request = req.body;
  try {
    const player = await createPlayerService(request);
    res.status(201).json(player);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: "Internal Error" });
  }
}
