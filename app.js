// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
