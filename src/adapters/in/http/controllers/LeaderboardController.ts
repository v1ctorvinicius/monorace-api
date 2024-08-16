import { Request, Response } from "express";

export const getLeaderboardByEventId = (req: Request, res: Response): void => {
  console.log(req.params.id);
  res.send("Get leaderboard by event id");
};
