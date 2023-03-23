const express = require('express');
const app = express();
const redis = require('redis');
const port = 7000;
const redisPort = 6379;
const client = redis.createClient(redisPort);

app.get('/', async (req, res) => {
  const number = await client.get('number');
  if (!number) {
    setTimeout(async () => {
      await client.setEx('number', 10, '3');
      return res.send('number cached');
    }, 3000);
  } else {
    res.send(number);
  }
});

const connect = async () => {
  try {
    await client.connect();
    app.listen(port, () => {
      console.log('App is running');
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
