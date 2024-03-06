const mongoose = require('mongoose');
const { logger } = require('../util/logger.util');

const connectDB = async () => {
  try {
    const mongoDBConnect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`MongoDB Connected to: ${mongoDBConnect.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
