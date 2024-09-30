// TODO: test this
// TODO: implement player repository interface

import { Player } from "@/domain/models/Player";
import PlayerRepository from "@/domain/ports/out/PlayerRepository";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export class PlayerRepositoryRedisImpl implements PlayerRepository {
  async findByEmail(email: string): Promise<Player | null> {
    const searchByEmailKey = `player:email:${email.trim()}`;
    const response = await client.hgetall(searchByEmailKey);
    if (!response || Object.keys(response).length === 0) return null;
    const player = response.id as string;
    return await this.findById(player);
  }

  findByName(name: string): Promise<Player[]> {
    throw new Error("Method not implemented.");
  }
  findByTeam(team: string): Promise<Player[]> {
    throw new Error("Method not implemented.");
  }
  findByPosition(position: string): Promise<Player[]> {
    throw new Error("Method not implemented.");
  }
  findByNationality(nationality: string): Promise<Player[]> {
    throw new Error("Method not implemented.");
  }

  async findIdByEmail(email: string): Promise<string | null> {
    const response = await client.hgetall(`player:email:${email}`);
    return response?.id as string;
  }

  async findById(id: string): Promise<Player | null> {
    const response = await client.hgetall(`player:id:${id}`);
    return this.parseResponseToModel(response);
  }

  async create(player: Player): Promise<Player | null> {
    const newPlayerRequest = this.parseModelToRequest(player);
    const idKey = `player:id:${player.getId().trim()}`;
    const emailKey = `player:email:${player.getEmail().trim()}`;
    await client.hset(idKey, newPlayerRequest);
    await client.hset(emailKey, { id: newPlayerRequest.id });
    return await this.findById(player.getId());
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
      password: player.getPasswordHash() || "",
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
