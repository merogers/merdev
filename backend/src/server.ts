import 'dotenv/config';
import app from './app';
import logger from './util/logger.util';

const port = process.env.PORT ?? 5000;

// Run express server
app.listen(port, async () => {
  // Log server start
  logger.info(`Server listening on port: ${port}`);
});
