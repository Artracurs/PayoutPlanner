const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./api/routes/userRoutes');
require('./api/config/db'); 

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server has been started on http://${HOST}:${PORT}`);
})


