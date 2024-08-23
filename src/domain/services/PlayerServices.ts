import { PlayerRepositoryRedisImpl } from "@/adapters/out/db/PlayerRepositoryRedisImpl";
import PlayerUC from "@/domain/ports/in/PlayerUC";
import { Player } from "../models/Player";
import PlayerRepository from "../repositories/PlayerRepository";

const playerRepository: PlayerRepository = new PlayerRepositoryRedisImpl();

export class PlayerServices implements PlayerUC {
  async getPlayerById(playerId: string): Promise<Player | null> {
    return await playerRepository.findPlayerById(playerId);
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    throw new Error("not implemented");
  }

  async createPlayer(request: any): Promise<Player | null> {
    const player = Player.create(request.username, request.email);
    if (!player) return null;

    // if (await findPlayerByEmail(player.getEmail())) {
    //   throw new Error("Player already exists");
    // }

    return await playerRepository.createPlayer(player);
  }

  getPlayerByUsername(username: string): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  getPlayerStatisticsById(playerId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getLeaderboard(raceId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getEventLeaderboard(eventId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  sendFriendRequestWithId(friendId: string): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  removeFriendWithId(friendId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  sendChallengeWithId(playerId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  acceptChallengeWithId(challengeId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  declineChallengeWithId(challengeId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  acceptFriendRequestWithId(requestId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  declineFriendRequestWithId(requestId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  registerInEventWithId(eventId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  useItem(itemName: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getInventory(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getTrophies(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

const playerServices = new PlayerServices();
