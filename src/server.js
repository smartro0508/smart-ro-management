import app from './app.js';
import env from './config/env.js';
import { connectDB, sequelize } from './config/database.js';
import * as models from './models/index.js';

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Sync models (creates tables in the database if they don't exist)
    // await sequelize.sync({ alter: true });
    // console.log('Database synced');

    // Start server
    app.listen(env.port, () => {
      console.log(`Server is running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
