function onPageLoad() {
    test_group("Selectors", function () {
        assert(OneImageLogo(), "One image logo");
        assert(fiveTweets(), "Five tweets");
        assert(addTweetTest(), "test3");
    });

    test_group("secondGroup", function () {
        assert(true, "test1");
        assert(true, "test2");
        assert(true, "test3");
    });
}
function OneImageLogo() {
    x = document.querySelectorAll("#logoOfek");
    return x.length == 1;
}

function fiveTweets() {
    x = document.querySelectorAll("#allTweets .userTweet");
    return x.length == 5;
}

function addTweetTest(){
    var existingComment = (document.getElementById("tweetText").value);
    createPublishedTweet();
    for(user of usersTweers){
        if(user.userName == "Oz" && user.text == existingComment){
            usersTweers.pop();
            document.getElementById("allTweets").lastElementChild.remove();
            return true;
        }
    }
    return false;
}

