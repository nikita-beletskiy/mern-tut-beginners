const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.post('/addfriend', async (req, res) => {
  const { name, age } = req.body;

  const friend = new FriendModel({ name, age });
  await friend.save();

  res.send(friend);
});

app.get('/read', async (req, res) => {
  await FriendModel.find({}, (err, result) => {
    err ? res.send(err) : res.send(result);
  });
});

app.put('/update', async (req, res) => {
  const { newAge, id } = req.body;

  try {
    await FriendModel.findById(id, (err, result) => {
      result.age = Number(newAge);
      result.save();
    });
  } catch (error) {
    console.log(error);
  }

  res.send('okay man');
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await FriendModel.findByIdAndRemove(id).exec();

  res.send('OK maaaan');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
