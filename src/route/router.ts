import { Router } from "express";

import { playerController } from "../controller/PlayerController";
import { authController } from "../controller/AuthController";

const router: Router = Router();

router.get("/players", playerController.getPlayers);

router.get("/auth/:username/:password", authController.login);
router.get("/auth/:username", authController.usernameExists);

export { router };
