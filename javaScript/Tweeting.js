var usersTweers = [
    {userName: 'Bobo', text: 'hello followers!', imgae: "../images/useravatar.png"},
    {userName: 'Elvis', text: 'this exercise is really easy!', imgae: "../images/useravatar.png"},
    {userName: 'Mimi', text: 'I want to go to sleep', imgae: "../images/useravatar.png"},
    {userName: 'Oz', text: 'this exercise is really easy!', imgae: "../images/useravatar.png"},
    {userName: 'Ofir', text: 'this exercise is really easy!', imgae: "../images/useravatar.png"}
];

window.onload = function () {

    realoadExistingTweets();
    onPageLoad();

    var publishButton = $("#publishButton").elements[0];

    publishButton.addEventListener("click", function () {
        createPublishedTweet();
        $("#tweetText").elements[0].value= "";
    });
};


var realoadExistingTweets = function () {
    var tweetSection = $("#allTweets").elements[0];
    for (userTweet of usersTweers) {
        tweetSection.appendChild(tweetStructure(userTweet, "existingTweet"));
    }
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

    image.setAttribute("src", user.imgae);

    return generalTweet;
};

var createPublishedTweet = function () {
    var tweetSection = $("#allTweets").elements[0];
    var selfUser = {userName: 'Oz', text: '', imgae:"../images/useravatar.png"}
    var existingComment = ($("#tweetText").elements[0].value);
    selfUser.text = existingComment;
    tweetSection.appendChild(tweetStructure(selfUser, "published"));
    usersTweers.push({userName: "Oz", text: existingComment});
};
