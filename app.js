const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const url = 'mongodb://admin:password@localhost:27017';
const dbName = 'user';

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/profile', async (req, res) => {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('user');

    const userProfile = await collection.findOne({});
    
    res.render('profile', { userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/edit-profile', async (req, res) => {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('user');

    const userProfile = await collection.findOne({});
    
    res.render('edit-profile', { userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } 
});

app.post('/edit-profile', async (req, res) => {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('user');

    const { name, email } = req.body;

    await collection.updateOne({}, { $set: { name, email } }, { upsert: true });

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


