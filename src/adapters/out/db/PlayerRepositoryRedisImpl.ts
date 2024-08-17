import Redis from "ioredis"

const client = new Redis("rediss://default:AekxAAIjcDEzOTRhYTYxMjMyNDA0OGU1OTBlOTU3MGY5NWFmMmZkNHAxMA@primary-terrier-59697.upstash.io:6379");
const coiso = await client.set('foo', 'bar');





// import { Redis } from "@upstash/redis";
// import dotenv from "dotenv";

// import fetch from "node-fetch";
// dotenv.config();

// const upstashRedisConnection = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// const client = upstashRedisConnection;

export async function findPlayerById(id: string): Promise<any | null> {
//   const response = await client.set("foo", "bar");
//   // const response = await client.hgetall(`player:${id}`);
//   console.log("response: ", response);
//   return response;
}

export function findPlayerByEmail(email: string) {}
