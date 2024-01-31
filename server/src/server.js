const express = require('express');
const bodyParser = require('body-parser');
// const userRoutes = require('./api/routes/userRoutes');
require('./api/config/db'); 

const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// app.use('/api/users', userRoutes);


app.use('/auth', authRoutes);
app.use('/user', userRoutes);


const HOST = process.env.HOST;
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server has been started on http://${HOST}:${PORT}`);
})


