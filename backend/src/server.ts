import 'dotenv/config';
import app from './app';
import logger from './util/logger.util';
import connectDB from './config/db.config';

const port = process.env.PORT ?? 5000;

// Run express server
app.listen(port, async () => {
  // Connect to MongoDB database
  await connectDB();

  // Log server start
  logger.info(`Server listening on port: ${port}...`);
});
