var usersTweers = [];
const tempId = "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22";

let mapUsresName = function () {
    return getAllUsers()
        .then(function (response) {
            getNameById(usersTweers, response.data);
            for (user of usersTweers) {
                user.userName = getNameById(user.userName, response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

var realoadExistingTweets = function () {
    var tweetSection = $("#allTweets").elements[0];
    for (userTweet of usersTweers) {
        tweetSection.appendChild(tweetStructure(userTweet, "existingTweet"));
    }
};

getAllTweets()
    .then(function (response) {
        for (userData of response.data) {
            usersTweers.push({userName: userData.user, text: userData.text, image: "images/useravatar.png"});
        }
    })
    .then(mapUsresName)
    .then(realoadExistingTweets)
    .catch(function (error) {
        console.log(error);
    });


window.onload = function () {
    onPageLoad();
    var publishButton = $("#publishButton").elements[0];
    publishButton.addEventListener("click", function () {
        createPublishedTweet();
        $("#tweetText").elements[0].value = "";
    });
};


var tweetStructure = function (user, nameClass) {

    var generalTweet = createDivElement();
    generalTweet.className = "row";
    var userTweet = createDivElement();
    userTweet.className = "userTweet";
    var image = createImageElement();
    image.className = "userImage";
    var details = createDivElement();
    details.className = "tweetDetails";
    var userName = createDivElement();
    userName.className = "userName " + nameClass;
    var userComment = createDivElement();
    userComment.className = "userComment";
    var userNameBold = createBoldElement();

    generalTweet.appendChild(userTweet);
    userTweet.appendChild(image);
    userTweet.appendChild(details);
    details.appendChild(userName);
    details.appendChild(userComment);
    userComment.appendChild(document.createTextNode(user.text));
    userNameBold.appendChild(document.createTextNode(user.userName));
    userName.appendChild(userNameBold);

    image.setAttribute("src", user.image);

    return generalTweet;
};

var createPublishedTweet = function () {
    var tweetSection = $("#allTweets").elements[0];
    var selfUser = {userName: 'Bulter', text: '', image: "images/useravatar.png"}
    var existingComment = ($("#tweetText").elements[0].value);
    selfUser.text = existingComment;
    tweetSection.appendChild(tweetStructure(selfUser, "published"));
    let detailedUser = {text: existingComment, user: tempId};
    usersTweers.push(selfUser);
    postTweet(detailedUser);

};

var postTweet = function (user) {
   putNewTweet(user);
};