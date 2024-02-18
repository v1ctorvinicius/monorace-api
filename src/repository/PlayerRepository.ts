import Player from "../model/Player";

class PlayerRepository {
  private static instance: PlayerRepository;

  public async findPlayerByUsername(username: string): Promise<Player> {
    const pool = this.getDbConnection();
    return pool
      .query("select * from monorace.player p where p.username = $1", [
        username,
      ])
      .then((data: any) => {
        return data;
      });
  }

  public async getPlayers(): Promise<Player[]> {
    const pool = this.getDbConnection();
    let players: Player[] = [];

    //@ts-ignore
    await pool.query("select * from monorace.player p").then((data) => {
      players = data.rows;
    });
    return players;
  }

  private constructor() {}

  private getDbConnection() {
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

    return pool;
  }

  public static getInstance(): PlayerRepository {
    if (!PlayerRepository.instance) {
      PlayerRepository.instance = new PlayerRepository();
    }
    return PlayerRepository.instance;
  }
}

export const playerRepository = PlayerRepository.getInstance();
