let dataHandle = require('../DataHandle');
let users = [];

dataHandle.readFile('Users.json')
    .then(function (res) {
        users = res;
    });

let initialize = (app) =>{
    app.get('/users', function (req, res) {
        res.send(users)
    });

    app.get('/users/:userId', function (req, res) {
        res.send(getFollowees(req.params.userId));
    });

    app.get('/users/following/:userId', function (req, res) {
        res.send(getAllUserFollowers(users, req.params.userId));
    });

    app.put('/following/:userId/:followeeId', function (req, res) {
        let userFollowees = getFollowees(req.params.userId);
        updateFollowees(userFollowees, req.params.followeeId);
        let tempAllUsers = [];

        dataHandle.readFile('Users.json')
            .then(function (res) {
                tempAllUsers = res;
                for (user of tempAllUsers) {
                    if (user._id === req.params.userId) {
                        user.following = userFollowees;
                        break;
                    }
                }
                dataHandle.writeToFile("Users.json", tempAllUsers);
            });

        res.end();
    });
};

let getFollowees = function (userId) {
    for (user of users) {
        if (user._id === userId) {
            return user.following;
        }
    }
    return null;
};

let getAllUserFollowers = function (allUsers, userId) {
    let followerUsers = [];
    for (user of allUsers) {
        if (user.following.includes(userId)) {
            followerUsers.push(user);
        }
    }
    return followerUsers;
};

let updateFollowees = function (userFollowees, followingUser) {
    let indexOfFollowee;
    let isFolloweeExists = false;

    for (user of userFollowees) {
        if (user === followingUser) {
            indexOfFollowee = userFollowees.indexOf(user);
            userFollowees.splice(indexOfFollowee, 1);
            isFolloweeExists = true;
        }
    }

    if (!isFolloweeExists) {
        userFollowees.push(followingUser);
    }
};

module.exports = {initialize : initialize};



