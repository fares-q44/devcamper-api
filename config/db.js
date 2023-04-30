const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, { family: 4 });

  console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
