import mongoose from 'mongoose';
import logger from '../util/logger.util';

const connectDB = async (): Promise<any> => {
  const mongoURI = process.env.MONGO_URI;
  if (mongoURI === undefined) {
    logger.error('Mongo URI is not defined');
    process.exit(1);
  }
  try {
    const mongoDBConnect = await mongoose.connect(mongoURI);
    logger.info(`MongoDB Connected to: ${mongoDBConnect.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectDB;
