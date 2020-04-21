const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;
const usersRouter = require('./routes/users.js');

mongoose.connect('mongodb://localhost:27017/loginMEAN', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(console.error)
app.use(express.json());
app.use('/users', usersRouter);
app.listen(PORT, () => console.log('server running on port ' + PORT));