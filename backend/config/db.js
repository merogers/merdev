// Connect to Database

const mongoose = require("mongoose");

const pc = require("picocolors");

const connectDB = async () => {
  try {
    const mongoDBConnect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info(pc.green(`> MongoDB Connected to: ${mongoDBConnect.connection.host}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
