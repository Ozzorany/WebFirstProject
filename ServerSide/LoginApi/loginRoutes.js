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
    app.put('/login', function (req, res) {
        for(user of users) {
            if (!req.body.username || !req.body.password) {
                res.end('login failed');
                break;
            } else if (req.body.username === user.username || req.body.password === user.password) {
                req.session.user = user.username;
                req.session.id = user._id;
                req.session.admin = true;
                res.end("login success!");
                console.log("login success!");
                break;
            } else {
                res.send(JSON.stringify({result: false}), 'utf-8');
                console.log("not good!");
                break;
            }
        }
    });
};


module.exports = {initialize : initialize};