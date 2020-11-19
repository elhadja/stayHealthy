const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const db = require('./db');

const app = express()
const port = 3000

db.init().then( () => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/user', usersRoutes)

  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });

})
.catch(err => {
  console.log('error when attempting to connect to mongodb');
})