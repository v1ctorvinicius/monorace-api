import PlayerUC from "@/domain/ports/in/PlayerUC";
import { Player } from "../models/Player";
import PlayerRepository from "../repositories/PlayerRepository";
import {
  findPlayerById,
  findPlayerByEmail,
  createPlayer,
} from "@/adapters/out/db/PlayerRepositoryRedisImpl";

export async function getPlayerByIdService(id: string): Promise<Player | null> {
  const player = await findPlayerById(id);
  console.log("player: ", player);
  
  return player;
}

export function getPlayerByEmailService(email: string): Player {
  throw new Error("not implemented");
}

export async function createPlayerService(
  request: any
): Promise<Player | null> {
  const player = Player.create(request.username, request.email);
  if (!player) return null;
  const newPlayer = await createPlayer(player);
  return newPlayer;
}

class PlayerServices implements PlayerUC {
  createPlayer(player: Player): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  getPlayerById(playerId: string): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  getPlayerByUsername(username: string): Promise<Player> {
    throw new Error("Method not implemented.");
  }
  getPlayerByEmail(email: string): Promise<Player> {
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
