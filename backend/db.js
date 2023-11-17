// db.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://neerajkumarm345:neeraj@cluster0.2w1ea84.mongodb.net/quizApp';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = db;
