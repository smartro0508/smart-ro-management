import app from './app.js';
import env from './config/env.js';
import { connectDB, sequelize } from './config/database.js';
import * as models from './models/index.js';
import fs from 'fs';

// Log startup crashes to a file so you can debug "500 Internal Server Error" on shared hosting
process.on('uncaughtException', (err) => {
  fs.writeFileSync('startup-error.log', `Uncaught Exception: ${err.stack || err}\n`);
});
process.on('unhandledRejection', (err) => {
  fs.writeFileSync('startup-error.log', `Unhandled Rejection: ${err.stack || err}\n`);
});

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // // Sync models (in production, use migrations instead of sync)
    // if (env.nodeEnv === 'development') {
    //   await sequelize.sync({ alter: true });
    //   console.log('Database synced');
    // }

    // Start server
    app.listen(env.port, () => {
      console.log(`Server is running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    fs.writeFileSync('startup-error.log', `Startup Error: ${error.stack || error}\n`);
    process.exit(1);
  }
};

startServer();
