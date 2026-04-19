import redis from "redis";
import config from "./environment.js";
import logger from "../utils/logger.js";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = config;

let redisHost = REDIS_HOST;
let redisPort = REDIS_PORT;

if (REDIS_HOST && REDIS_HOST.includes(':')) {
  const parts = REDIS_HOST.split(':');
  redisHost = parts[0];
  redisPort = parseInt(parts[1]) || REDIS_PORT;
}

const client = redis.createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: redisHost,
    port: parseInt(redisPort),
  },
});

client.on("error", (err) => {
  logger.error("Redis connection error:", err.message);
});

client.on("connect", () => {
  logger.info("✅ Redis connected successfully");
});

export async function connectRedis() {
  if (!REDIS_HOST) {
    logger.warn("⚠️ Redis host not provided. Skipping Redis connection. Some features may not work.");
    return;
  }

  try {
    await client.connect();
  } catch (error) {
    logger.error("❌ Failed to connect to Redis. Continuing without Redis:", error.message);
  }
}

export const redisClient = client;