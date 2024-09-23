// TODO: test this
// TODO: implement player repository interface

import { Player } from "@/domain/models/Player";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import PlayerRepository from "@/domain/repositories/PlayerRepository";

dotenv.config();

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export class PlayerRepositoryRedisImpl implements PlayerRepository {

  async findPlayerIdByEmail(email: string): Promise<string | null> {
    const response = await client.hgetall(`player:email:${email}`);
    return response?.id as string;
  }

  async findPlayerById(id: string): Promise<Player | null> {
    const response = await client.hgetall(`player:${id}`);
    return this.parseResponseToModel(response);
  }

  async createPlayer(player: Player): Promise<Player | null> {
    const newPlayerRequest = this.parseModelToRequest(player);
    await client.hset(`player:${player.getId()}`, newPlayerRequest);
    await client.hset(`player:email:${player.getEmail()}`, {
      id: newPlayerRequest.id,
    });
    return await this.findPlayerById(player.getId());
  }

  private parseResponseToModel(response: any): Player {
    return new Player(
      response.id,
      response.username,
      response.password,
      response.email,
      response.avatarUrl,
      response.rank,
      parseInt(response.level),
      parseInt(response.experience),
      parseInt(response.score),
      response.trophies && response.trophies.length > 0
        ? response.trophies.split(",")
        : [],
      parseInt(response.completedRaces),
      response.achievements && response.achievements.length > 0
        ? response.achievements.split(",")
        : [],
      Array.isArray(response.inventory) ? response.inventory : [],
      response.preferredCar,
      typeof response.settings === "object" ? response.settings : {},
      response.eventsParticipated && response.eventsParticipated.length > 0
        ? new Set(response.eventsParticipated.split(","))
        : new Set(),
      response.friends && response.friends.length > 0
        ? new Set(response.friends.split(",").map(Number))
        : new Set(),
      response.currentRace,
      response.bestLapTime ? parseFloat(response.bestLapTime) : null,
      parseInt(response.totalRaces),
      parseInt(response.totalWins),
      response.currentEvents && response.currentEvents.length > 0
        ? new Set(response.currentEvents.split(",").map(Number))
        : new Set(),
      response.directChallenges && response.directChallenges.length > 0
        ? new Set(response.directChallenges.split(",").map(Number))
        : new Set(),
      response.carType,
      typeof response.customizations === "object"
        ? response.customizations
        : {},
      parseInt(response.coins)
    );
  }

  private parseModelToRequest(player: Player): any {
    return {
      id: player.getId(),
      username: player.getUsername() || "",
      password: player.getPassword() || "",
      email: player.getEmail() || "",
      avatarUrl: player.getAvatarUrl() || "",
      rank: player.getRank() || "",
      level: player.getLevel().toString(),
      experience: player.getExperience().toString(),
      score: player.getScore().toString(),
      trophies: player.getTrophies().join(",") || "",
      completedRaces: player.getCompletedRaces().toString(),
      achievements: player.getAchievements().join(",") || "",
      inventory: JSON.stringify(player.getInventory()) || "[]",
      preferredCar: player.getPreferredCar() || "",
      settings: JSON.stringify(player.getSettings()) || "{}",
      eventsParticipated:
        Array.from(player.getEventsParticipated()).join(",") || "",
      friends: Array.from(player.getFriends()).join(",") || "",
      currentRace: player.getCurrentRace() || "",
      bestLapTime: player.getBestLapTime()?.toString() || "",
      totalRaces: player.getTotalRaces().toString(),
      totalWins: player.getTotalWins().toString(),
      currentEvents: Array.from(player.getCurrentEvents()).join(",") || "",
      directChallenges:
        Array.from(player.getDirectChallenges()).join(",") || "",
      carType: player.getCarType() || "",
      customizations: JSON.stringify(player.getCustomizations()) || "{}",
      coins: player.getCoins().toString(),
    };
  }
}
