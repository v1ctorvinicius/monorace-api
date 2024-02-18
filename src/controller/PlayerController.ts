import { Request, Response } from "express";

export default class PlayerController {
  public static instance: PlayerController;

  private constructor() {}

  public async getPlayers(req: Request, res: Response) {
    const dotenv = require("dotenv");
    dotenv.config();

    const { Pool } = require("pg");

    const pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
        // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
        // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
      },
    });

    //@ts-ignore
    await pool.query("select * from monorace.player p").then((data) => {
      res.json(data.rows);
    });
  }

  public static getInstance(): PlayerController {
    if (!PlayerController.instance) {
      PlayerController.instance = new PlayerController();
    }
    return PlayerController.instance;
  }
}
