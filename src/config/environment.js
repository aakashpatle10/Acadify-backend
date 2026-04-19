import dotenv from 'dotenv';
dotenv.config();

const parseOrigins = (origins) =>
    origins
        ? origins.split(',').map((origin) => origin.trim()).filter(Boolean)
        : [];

export default {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    GROK_API_URL: process.env.GROK_API_URL || 'https://api.x.ai/v1',
    ALLOWED_ORIGINS: parseOrigins(process.env.ALLOWED_ORIGINS),
    NODE_ENV: process.env.NODE_ENV || 'development',
    GROK_API_KEY: process.env.GROK_API_KEY,
};