import { createServer } from 'http';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { connectRedis } from './src/config/redis.js';
import config from './src/config/environment.js';
import logger from './src/utils/logger.js';


const { PORT } = config;

async function startServer() {
  try {
    
    await connectDB();
    await connectRedis();

    
    const httpServer = createServer(app);
    
    
    
    
    
    httpServer.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
      
    });
  } catch (error) {
    logger.error("Server failed to start:", error);
    process.exit(1);
  }
}


startServer();
