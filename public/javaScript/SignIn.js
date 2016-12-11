/**
 * Created by Jbt on 12/8/2016.
 */
window.onload = function () {
    var loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", function () {
        requestSignIn();
    });
};

let requestSignIn = function () {
    userLogin(getInfo()).then(function (res) {
        if(res.data.result){
            alert("yey");
        } else {
            alert("boo");
        }
    }).catch(function (res) {
        console.log(res);
    });
};

let getInfo = function () {
    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
};