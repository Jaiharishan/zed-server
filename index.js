require('dotenv').config({ path: './env/.env' })
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors')
require('./DB/setup')
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())
const authRouter = require('./api/auth');
const apiRouter = require('./api/api')

app.use('/api', apiRouter)
app.use('/auth', authRouter)
app.listen(port, () => console.log(`Listening on port ${port}`));