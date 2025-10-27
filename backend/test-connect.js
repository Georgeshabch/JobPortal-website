// Simple script to test MongoDB connection using the same .env
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MONGO_URI present?', !!process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error('MongoDB connection failed:');
    console.error(err);
    if (err && err.name === 'MongoServerSelectionError') {
      console.error('Hint: Check Atlas IP whitelist, network/DNS, and that the cluster name in the URI is correct.');
    }
    process.exit(1);
  });
