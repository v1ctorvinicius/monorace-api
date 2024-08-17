import PlayerUC from "@/domain/ports/in/PlayerUC";
import { Player } from "../models/Player";
import PlayerRepository from "../repositories/PlayerRepository";
import {
  findPlayerById,
  findPlayerByEmail,
} from "@/adapters/out/db/PlayerRepositoryRedisImpl";

export async function getPlayerByIdService(id: string): Promise<Player> {
  const player = await findPlayerById(id)
    .then((response) => {
      // console.log("response: ", response);
      return response;
    })
    .catch((err) => {
      console.log("erro: ", err);
    })
    .finally(() => {
      console.log("acabou");
    });

  return player!;
}

export function getPlayerByEmailService(email: string): Player {
  // const data = findPlayerByEmail(email);
  // data.then(() => {
  //   console.log("data: ", data);
  // });
  // if (!data) {
  throw new Error("not implemented");
  // }
  // const player = new Player("COISO", "", email, "", "");
  // return player;
}

class PlayerServices implements PlayerUC {
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
