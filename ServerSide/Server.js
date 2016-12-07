var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());


let users = [];
let tweets = [];

app.use(express.static(path.resolve("../public")));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

fs.readFile('Users.json','utf8', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data);
});

fs.readFile('Tweets.json','utf8', (err, data) => {
    if (err) throw err;
    tweets = JSON.parse(data);
});

app.get('/users', function (req, res) {
    res.send(users)
});

app.get('/tweets', function (req, res) {
    res.send(tweets)
});

app.get('/users/:userId' , function (req, res) {
    res.send(getFollowees(req.params.userId));
});

app.listen(8000, function () {
    console.log('listening on port 8000!')
});


app.put('/tweets', function(request, response){
    fs.readFile("Tweets.json", function (err, content) {
        res.writeHead(200, {'Content-Type' : 'text/json'});
        tweets.push({text: request.body.text, user: request.body.username});
        fs.writeFile('Tweets.json', JSON.stringify(tweets));
        res.end(JSON.stringify(tweets),'utf-8');
    })
    // fs.writeFile("Tweets.json", request.body , function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //
    //     console.log("The file was saved!");
    // });
});

let getFollowees = function(userId){
    for(user of users){
        if(user._id === userId){
            return user.following;
        }
    }
    return null;
}

