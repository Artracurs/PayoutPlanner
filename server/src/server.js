const express = require('express');
const connectDB = require('./api/config/db');

const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');


const HOST = process.env.HOST;
const PORT = process.env.PORT || 4000;

connectDB();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server has been started on http://${HOST}:${PORT}`);
})


