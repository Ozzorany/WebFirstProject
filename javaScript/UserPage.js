var usersNames = [{name: "Marty McFly", stage: "follow"}, {name: "Tooli", stage: "follow"}, {
    name: "Oz",
    stage: "follow"
}, {name: "Marty McFly", stage: "follow"}, {name: "Marty McFly", stage: "follow"}, {
    name: "Marty McFly",
    stage: "follow"
},
    {name: "Marty McFly", stage: "follow"}, {name: "Marty McFly", stage: "follow"}, {
        name: "Marty McFly",
        stage: "follow"
    }, {name: "Marty McFly", stage: "follow"}];

var currentShowedUsers = usersNames.slice();

window.onload = function () {
    reloadExistingUsers();
    var filterhSearch = document.getElementById("filter-user");

    filterhSearch.addEventListener("input", function () {
        var textToFilter = document.getElementById("filter-user").value;
        currentShowedUsers = usersNames.filter(function(user){
            return user.name.includes(textToFilter);
        });
        var existingUsersSection = document.getElementById("existing-users");
        existingUsersSection.innerHTML = "";
        reloadExistingUsers();
    });
};

var reloadExistingUsers = function () {

    for (user of currentShowedUsers) {
        showUser(user.name, "../images/useravatar.png", user.stage, "col-md-2");
    }
};

var UserStructure = function (NameUser, imageSource, userStage, SectionSize) {

    var userSection = createDivElement();
    userSection.className = SectionSize;
    var thumbnail = createDivElement();
    thumbnail.className = "thumbnail";
    var generalUser = createDivElement();
    generalUser.className = "generalUser";
    var userImage = createImageElement();
    userImage.className = "userImage";
    var userFollow = createDivElement();
    userFollow.className = "userFollow";
    var button = createInputlement();
    button.className = "btn btn-primary follow";
    button.type="button";
    var userName = createDivElement();
    userName.className = "userName";

    userSection.appendChild(thumbnail);
    thumbnail.appendChild(generalUser);
    generalUser.appendChild(userImage);
    generalUser.appendChild(userFollow);
    generalUser.appendChild(userName);
    userFollow.appendChild(button);
    userName.appendChild(document.createTextNode(NameUser));
    button.value = (userStage);
    button.onclick = function () {
        chengeStatus(button);
        //showFolowee(button);
    };

    userImage.setAttribute("src", imageSource);

    return userSection;
};

var chengeStatus = function(button){
    if(button.value === "follow"){
        button.value = "unfollow";
    } else {
        button.value = "follow";
    }
}

var showUser = function (NameUser, imageSource, userStage, SectionSize) {
    var existingUsersSection = document.getElementById("existing-users");
    existingUsersSection.appendChild(UserStructure(NameUser, imageSource, userStage, SectionSize));
}

var showFolowee = function (NameUser, imageSource, userStage) {
    var FoloweeSection = document.getElementById("folowees-users");
    FoloweeSection.appendChild(UserStructure(NameUser, "../images/useravatar.png", userStage,"col-md-12"));
}

var createDivElement = function () {
    return document.createElement("div")
};

var createImageElement = function () {
    return document.createElement("img")
};

var createBoldElement = function () {
    return document.createElement("b")
};

var createInputlement = function () {
    return document.createElement("input")
};
