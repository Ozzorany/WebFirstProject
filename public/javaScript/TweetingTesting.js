function onPageLoad() {
    test_group("Selectors", function () {
        assert(OneImageLogo(), "One image logo");
        assert(fiveTweets(), "Five tweets");
        //assert(addTweetTest(), "Add tweet test");
        assert(nonExistingId(), "Non existing id");

    });

    test_group("CSS functions", function () {
        assert(setCss(), "Css() sets welcome-header to blue");
        assert(addClass(), "Add class");
        assert(removeClass(), "Remove class");
    });

    test_group("Functional functions tests", function () {
        assert(checkAllFunction(), "Check all function");
        assert(checkAnyFunction(), "Check any function");
        assert(AllFunctionWithMultipleFunctions(), "All function with multiple functions");
    });
}
function OneImageLogo() {
    x = $("#logoOfek");
    return x.count() == 1;
}

function fiveTweets() {
    x = $("#allTweets .userTweet");
    return x.count() == 5;
}

function addTweetTest(){
    var existingComment = ($("#tweetText").elements[0].value);
    createPublishedTweet();
    for(user of usersTweers){
        if(user.userName == "Oz" && user.text == existingComment){
            usersTweers.pop();
            $("#allTweets").elements[0].lastElementChild.remove();
            return true;
        }
    }
    return false;
}

function nonExistingId(){
    var nonExistingComment = $("#oz");
    return nonExistingComment.count() == 0;
}

function setCss(){
    var cssChange = $(".userName");
    cssChange.css("color","blue");
    var attributes = cssChange.getAttribute("style");
    for(attribute of attributes){
        if(!attribute.split(": ")[1].includes("blue")){
            return false;
        }
    }
    cssChange.css("color","green");
    return true;
}

function addClass(){
    var logo = $("#logoOfek");
    logo.addClass("Papa");
    if(logo.getAttribute("class")[0].includes("Papa")){
        return true;
    }
    logo.removeClass("Papa");
    return false;
}

function removeClass(){
    var logo = $("#logoOfek");
    logo.addClass("toRemove");
    logo.removeClass("toRemove");
    if(!logo.getAttribute("class")[0].includes("toRemove")){
        return true;
    }
    return false;
}

function checkAllFunction(){
    var userNames = $(".userName");
    return userNames.all(onlyChild);
}

function checkAnyFunction(){
    var userNames = $(".row");
    return userNames.any(noChild);
}

function onlyChild(element){
    if(element.children.length == 1){
        return true;
    }
    return false;
}

function noChild(element){
    if(element.children.length != 0){
        return true;
    }
    return false;
}

function AllFunctionWithMultipleFunctions(){
    var userNames = $(".userName");
    return userNames.all(onlyChild, checkColor);
}

function checkColor(element){
    if(element.style.color == "green"){
        return true;
    }
    return false;
}

