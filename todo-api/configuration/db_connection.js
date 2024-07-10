require('dotenv').config()
const mongoose = require('mongoose')

const DATABASE_URL = process.env.DATABASE_URL;
mongoose
    .connect('mongodb://localhost:27017/my_todo_api', {})
    .then(() => console.log(`connected`))
    .catch((err) => console.log(`error connect to the database`, err))