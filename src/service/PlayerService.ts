import Player from "../model/Player";
import { playerRepository } from "../repository/PlayerRepository";

class PlayerService {
  private static instance: PlayerService;

  public getPlayer(username: string): Promise<Player> {
    return playerRepository
      .findPlayerByUsername(username)
      .then((data) => data.rows[0]);
  }

  public getPlayers(): Promise<Player[]> {
    return playerRepository.getPlayers();
  }

  public createPlayer(username: string): Player {
    return new Player(username);
  }

  public static getInstance(): PlayerService {
    if (!PlayerService.instance) {
      PlayerService.instance = new PlayerService();
    }
    return PlayerService.instance;
  }

  private constructor() {}
}

export const playerService = PlayerService.getInstance();
