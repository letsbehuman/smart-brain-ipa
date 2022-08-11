// postgres pw:test terminal write "psql -U postgres"

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'proccess.env.PORT',
    ssl: true,
    // port: 3306,
    // user: 'postgres',
    // password: 'test',
    // database: 'smart-brain',
  },
});

const app = express();
app.use(express.json());

app.use(cors());
//*
//this does do nothing
app.get('/', (req, res) => {
  res.send('succes');
});

//* SIGNIN
app.post('/signin', (req, res) => {
  signin.handleSingin(req, res, db, bcrypt);
});

//*REGISTER
app.post('/register', register.handleRegister(db, bcrypt)); //this will recive req and res anyway, same as above

//*PROFILE
app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
});

//*IMAGE
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handlerApiCall(req, res);
});

//*
const PORT = process.env.PORT; //PORT is defined in the terminal as "PORT=3000 node server.js"
app.listen(PORT || 3000, () => {
  console.log(`service is listening on port ${PORT}`);
});

console.log(PORT);

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });
