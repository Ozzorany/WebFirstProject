var usersTweers = [];

let mapUsresName = function () {
    return getAllUsers()
        .then(function (response) {
            for (user of usersTweers) {
                for (userData of response.data) {
                    if (user.userName === userData._id) {
                        user.userName = userData.username;
                    }
                }
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
    var selfUser = {userName: 'Oz', text: '', image: "images/useravatar.png"}
    var existingComment = ($("#tweetText").elements[0].value);
    selfUser.text = existingComment;
    tweetSection.appendChild(tweetStructure(selfUser, "published"));
    let detailedUser = {text: existingComment, id:"10c06b27-d8ee-4435-9cee-0a2a838ca14a"};
    usersTweers.push(selfUser);
    postTweet(detailedUser);

};

var postTweet = function (user) {
    postNewTweet(user)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

//     axios.put('http://10.103.50.193:8080/tweets', user)
//         .then(function (response) {
//             console.log(response.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }