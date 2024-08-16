import { Request, Response } from "express";

class PlayerController {
  public static instance: PlayerController;

  public async getPlayers(req: Request, res: Response) {
    playerService.getPlayers().then((data) => {
      res.json(data);
    });
  }

  public static getInstance(): PlayerController {
    if (!PlayerController.instance) {
      PlayerController.instance = new PlayerController();
    }
    return PlayerController.instance;
  }
  private constructor() {}
}

export const playerController = PlayerController.getInstance();
