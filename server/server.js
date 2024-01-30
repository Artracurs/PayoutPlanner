require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const { Schema } = mongoose;

app.use(bodyParser.json())

const uri =  process.env.MONGO_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const userSchema = new Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);


app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});


const port = 4000;
const host = 'localhost'

app.listen(port, () => {
  console.log(`Server has been started on http://${host}:${port}`);
})


