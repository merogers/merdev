import mongoose from 'mongoose';
import logger from '../util/logger.util';

const mongoURI = process.env.MONGO_URI as string;

const connectDB = async (): Promise<void> => {
  try {
    const mongoDBConnect = await mongoose.connect(mongoURI);
    logger.info(`MongoDB Connected to: ${mongoDBConnect.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectDB;
