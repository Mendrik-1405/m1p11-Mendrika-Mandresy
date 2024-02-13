// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(bodyParser.json());

//gestion route
const allRoutes = require('./src/routes/index');

async function use_routes(routes){
  Object.keys(routes)
  .forEach((key) => {
      app.use(`/${key}`, routes[key]);
  });
}

use_routes(allRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
