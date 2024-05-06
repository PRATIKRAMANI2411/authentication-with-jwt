const express = require('express');
const app = express();
const db = require('./db')
require('dotenv').config();
const bodyParser = require('body-parser');

const userRouter = require('./routers/userRouter')

app.use(bodyParser.json());
const PORT = process.env.PORT || 2200;

app.use('/api/auth', userRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})