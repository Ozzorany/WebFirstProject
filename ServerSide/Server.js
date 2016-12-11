var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.json());
let userApi = require('./UserApi/userApi');
let tweetApi = require('./TweetingApi/tweetingApi');
let loginApi = require('./LoginApi/loginRoutes');

app.use(express.static(path.resolve("../public")));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

userApi.initialize(app);
loginApi.initialize(app);
tweetApi.initialize(app);




app.listen(8000, function () {
    console.log('listening on port 8000!')
});