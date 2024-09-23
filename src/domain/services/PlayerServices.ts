import { PlayerRepositoryRedisImpl } from "@/adapters/out/db/PlayerRepositoryRedisImpl";
import PlayerUC from "@/domain/ports/in/PlayerUC";
import { Player } from "../models/Player";
import PlayerRepository from "../repositories/PlayerRepository";

const playerRepository: PlayerRepository = new PlayerRepositoryRedisImpl();

export class PlayerServices implements PlayerUC {
  async getPlayerById(playerId: string): Promise<Player | null> {
    return await playerRepository.findPlayerById(playerId);
  }

  async getPlayerIdByEmail(email: string): Promise<string | null> {
    return await playerRepository.findPlayerIdByEmail(email);
  }

  async signUpPlayer(request: any): Promise<Player | null> {
    const player = Player.create(
      request.username,
      request.password,
      request.email
    );

    if (!player) return null;   

    if (await playerRepository.findPlayerIdByEmail(player.getEmail())) {
      throw new Error("Sorry, email already in use");
    }

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
