var usersTweers = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'}
]

window.onload = function () {
    var publishButton = document.getElementById("publishButton");
    realoadExistingTweets();
    publishButton.addEventListener("click", function () {
        createPublishedTweet();
        document.getElementById("tweetText").value= "";
    });
};


var realoadExistingTweets = function () {
    for (userTweet of usersTweers) {
        tweetStructure(userTweet.username, userTweet.text, "../images/useravatar.png", "existingTweet");
    }
};

var tweetStructure = function (NameUser, comment, imageSource, nameClass) {

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
    userComment.appendChild(document.createTextNode(comment));
    userNameBold.appendChild(document.createTextNode(NameUser));
    userName.appendChild(userNameBold);


    var existingComment = document.createTextNode(comment);
    image.setAttribute("src", imageSource);

    var tweetSection = document.getElementById("allTweets");
    tweetSection.appendChild(generalTweet);
};

var createPublishedTweet = function () {
    var existingComment = (document.getElementById("tweetText").value);
    tweetStructure("Oz", existingComment,"../images/useravatar.png", "published");
    usersTweers.push({username: "Oz", text: existingComment});
};


var createDivElement = function () {
    return document.createElement("div")
};

var createImageElement = function () {
    return document.createElement("img")
};

var createBoldElement = function () {
    return document.createElement("b")
};
