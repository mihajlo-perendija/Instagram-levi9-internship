const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const {mongoose} = require('./server/db/mongoose');
const usersRouter = require('./server/routes/usersRouter');
const postsRouter = require('./server/routes/postsRouter');

const port = process.env.PORT || 3000;
var app = express();

var corsOptions = {
    exposedHeaders: ['x-auth']
  }

app.use(cors(corsOptions));
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


app.listen(port, () => {
    console.log('Started on port' + port);
});

module.exports = {app};