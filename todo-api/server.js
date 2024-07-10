const express = require('express');
const app = express();
const port = 3000;
const todoRoutes = require('./routes/todoRoutes');
const UserRoutes = require("./routes/UserRoutes");
const cookieParser = require('cookie-parser');

require("./configuration/db_connection");
const cors = require('cors');

app.use(cookieParser());

// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todo', todoRoutes);
app.use("/auth", UserRoutes);



app.listen(port, () => console.log(`You are listening on port ${port}`));
