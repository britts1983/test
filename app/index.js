const User = require('../models/user')
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const auth = require('../router/auth');
const user = require('../router/user');
const sequelize = require('../utils/db');

const app = express();





app.use(express.json());


app.use('/login', auth);
app.use('/register', user);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})


// sequelize.sync({force:true});
// console.log("model  synchronized successfully.");