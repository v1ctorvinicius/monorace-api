import { Router } from "express";
import { getPlayerById, getPlayerByEmail, createPlayer } from "../controllers/PlayerController";

const router = Router();

router.get("/players/:id", (req, res) => getPlayerById(req, res));
router.get("/players/email/:email", (req, res) => getPlayerByEmail(req, res));
router.post("/players", (req, res) => createPlayer(req, res));

export default router;