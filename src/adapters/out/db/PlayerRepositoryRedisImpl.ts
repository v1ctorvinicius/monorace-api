// TODO: test this

import { Player } from "@/domain/models/Player";
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();
const client = new Redis(process.env.UPSTASH_REDIS_URL!);

export async function findPlayerById(id: string): Promise<Player | null> {
  const response = await getPlayerData(id);
  console.log("response: ", response);
  return parsePlayerData(response);
}

export function findPlayerByEmail(email: string) {}

async function getPlayerData(id: string) {
  return await client.hgetall(`player:${id}`);
}

function parsePlayerData(response: any): Player {
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
