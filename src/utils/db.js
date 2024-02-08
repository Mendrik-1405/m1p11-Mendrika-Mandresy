const mongoose = require('mongoose');

const mongodbUri = process.env.MONGODB_URI;

mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB ${mongodbUri}`);
});

module.exports = mongoose;
