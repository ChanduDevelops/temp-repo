require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/countrycapitals')
  .then(() => {
    console.log('mongodb connected');

    app.listen(3030, () => {
      console.log(`serving at port 3030`);
    });
  })
  .catch((e) => {
    console.error(`MongoDB error: ${e.message}`);
  });

const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.mysqlPassword,
  database: process.env.mysqlDB,
});

conn.connect((err) => {
  if (err) {
    console.error(`MySQL error: ${err.message}`);
    return;
  } else {
    console.log(`mysql DB connected`);

    // app.listen(3030, () => console.log(`serving at port 3030`))
  }
});

const countryModel = require('./mongoModel');
app.get('/', async (req, res) => {
  try {
    res.send('this is from the server');
  } catch (e) {
    console.error(`DB error: ${e.message}`);
    res.status(404);
  }
});
app.get('/:language', async (req, res) => {
  try {
    const language = req.params?.language;
    const result = await countryModel.find({ language: language });
    res.json(result);
  } catch (e) {
    console.error(`DB error: ${e.message}`);
    res.status(404);
  }
});
