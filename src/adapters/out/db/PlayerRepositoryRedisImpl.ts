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
  async findPlayerByEmail(email: string): Promise<Player | null> {
    const response = await client.hgetall(`player:email:${email}`);
    return PlayerRepositoryRedisImpl.parseResponseToModel(response);
  }

  async findPlayerById(id: string): Promise<Player | null> {
    const response = await client.hgetall(`player:${id}`);
    return PlayerRepositoryRedisImpl.parseResponseToModel(response);
  }

  async createPlayer(player: Player): Promise<Player | null> {
    const requestBody = PlayerRepositoryRedisImpl.parseModelToRequest(player);
    await client.hset(`player:${player.getId()}`, requestBody);
    return this.findPlayerById(player.getId());
  }

  private static parseResponseToModel(response: any): Player {
    return new Player(
      response.id,
      response.username,
      response.email,
      response.avatarUrl,
      response.rank,
      parseInt(response.level),
      parseInt(response.experience),
      parseInt(response.score),
      response.trophies ? response.trophies.split(",") : [],
      parseInt(response.completedRaces),
      response.achievements ? response.achievements.split(",") : [],
      response.inventory ? JSON.parse(response.inventory) : [],
      response.preferredCar,
      response.settings ? JSON.parse(response.settings) : {},
      response.eventsParticipated
        ? new Set(response.eventsParticipated.split(","))
        : new Set(),
      response.friends
        ? new Set(response.friends.split(",").map(Number))
        : new Set(),
      response.currentRace,
      response.bestLapTime ? parseFloat(response.bestLapTime) : null,
      parseInt(response.totalRaces),
      parseInt(response.totalWins),
      response.currentEvents
        ? new Set(response.currentEvents.split(",").map(Number))
        : new Set(),
      response.directChallenges
        ? new Set(response.directChallenges.split(",").map(Number))
        : new Set(),
      response.carType,
      response.customizations ? JSON.parse(response.customizations) : {},
      parseInt(response.coins)
    );
  }

  private static parseModelToRequest(player: Player): any {
    return {
      id: player.getId(),
      username: player.getUsername() || "",
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
