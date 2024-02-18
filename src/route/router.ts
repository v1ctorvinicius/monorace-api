import { Router } from "express";

import PlayerController from "../controller/PlayerController";

const router: Router = Router();

const playerController = PlayerController.getInstance();
router.get("/players", playerController.getPlayers);

export { router };
