var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
let userApi = require('./UserApi/userApi');
let tweetApi = require('./TweetingApi/tweetingApi');

app.use(express.static(path.resolve("../public")));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


userApi.initialize(app);
tweetApi.initialize(app);

app.listen(8000, function () {
    console.log('listening on port 8000!')
});
