/**
 * Created by Jbt on 12/8/2016.
 */
let dataHandle = require('../DataHandle');
let users = [];

dataHandle.readFile('Users.json')
    .then(function (res) {
        users = res;
    });

let initialize = (app) => {
    app.put('/login', function (req, resault) {
        getAllTheUsers().then(function (res) {
            users = res;
            let result = {result:false};
            let isUserExists = false;

            for(user of users) {
                if (!req.body.username || !req.body.password) {
                    res.end('login failed');
                    break;
                } else if (req.body.username === user.username && req.body.password === user.password) {
                    req.session.user = user.username;
                    req.session.userid = user._id;
                    req.session.admin = true;
                    isUserExists = true;
                    console.log("login success!");
                } else {
                    console.log("not good!");
                }
            }

            if(isUserExists){
                result.result = true;
            }
            resault.send(result);
        }).catch(function (res) {
            console.log(res);
        });

    });

    app.put('/logOut', function (req, resault) {
        req.session.destroy();
    });
};

var getAllTheUsers = function () {
    return new Promise(function (resolve, reject) {
        let allUsers = [];
        dataHandle.readFile('Users.json')
            .then(function (res) {
                allUsers = res;
                resolve(allUsers);
            });
    });
}


module.exports = {initialize : initialize};xports = {initialize : initialize};