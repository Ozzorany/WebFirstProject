/**
 * Created by Jbt on 12/11/2016.
 */
window.onload = function () {
    var loginButton = document.getElementById("sign-up-button");
    // loginButton.addEventListener("click", function () {
    //     requestSignUp();
    // });
};

let requestSignUp = function () {
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    if (!checkConfirmPassword(password, confirmPassword)) {
        alert("confrim your password!");
    } else {
        registerUser({_id: "", username: userName, password: password, following: []}).then(function (res) {
            alert("success!")
        }).catch(function (res) {
            alert("failed to register!");
        });
    }
}
function checkConfirmPassword(password, confirmPassword) {
    if (password != confirmPassword) {
        return false;
    }

    return true;
}
