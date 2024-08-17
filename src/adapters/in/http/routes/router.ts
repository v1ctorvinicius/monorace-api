import { Router } from "express";
import { getPlayerById } from "../controllers/PlayerController";

export const router = Router();

router.get("/players/:id", (req, res) => getPlayerById(req, res));