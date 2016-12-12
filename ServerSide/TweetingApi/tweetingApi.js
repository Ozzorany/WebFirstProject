/**
 * Created by Jbt on 12/8/2016.
 */
let dataHandle = require('../DataHandle');
let tweets = [];
let allUsers = [];

dataHandle.readFile('Users.json')
    .then(function (res) {
        allUsers = res;
    });


dataHandle.readFile('Tweets.json')
    .then(function (res) {
        tweets = res;
    });

let initialize = (app) => {
    app.get('/tweets', function (req, res) {
        (getAllUserTweets(req.session.userid).then(function (fucRes) {
            res.send(fucRes)
        }));
    });

    app.get('/tweets/:userId', function (req, res) {
        res.send(getAllUserTweets(req.params.userId));
    });


    app.put('/tweets', function (req, res) {
        tweets.push({text: req.body.text, user: req.body.user});
        dataHandle.writeToFile("Tweets.json", tweets);
        res.end;
    });
};

let getAllUserTweets = function (userId) {
    return new Promise(function (resolve, reject) {
        let mapedUsers = [];
        mapFollowees(allUsers, userId).then(function (res) {
            mapedUsers = res;
            let userTweets = followeesTweets(tweets, mapedUsers, userId);
            resolve(userTweets);
        })
    });


    return userTweets;
};

let mapFollowees = function (users, userId) {
    return new Promise(function (resolve, reject) {
        dataHandle.readFile('Users.json')
            .then(function (res) {
                allUsers = res;
                let mapedUsers = [];
                for (user of allUsers) {
                    if (userId === user._id) {
                        mapedUsers = (user.following);
                    }
                }
                mapedUsers.push(userId);
                resolve(mapedUsers);
            });
    });
}


let followeesTweets = function (allTweets, mapedUsers, userId) {
    let mapedTweets = [];
    if (mapedUsers.length == 0) {
        mapedUsers = [userId];
    }

    for (tweet of allTweets) {
        for (user of mapedUsers) {
            if (tweet.user === user) {
                mapedTweets.push({text: tweet.text, user: tweet.user});
            }
        }
    }
    return mapedTweets;
};

module.exports = {initialize: initialize, getAllUserTweets:getAllUserTweets};