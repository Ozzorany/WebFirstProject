var usersNames = [{id: "_1", name: "Marty McFly", stage: "follow", image: "../images/useravatar.png"}, {
    id: "_2",
    name: "Tooli",
    stage: "follow",
    image: "../images/useravatar.png"
}, {id: "_9",
    name: "Oz",
    stage: "follow", image: "../images/useravatar.png"
}, {id: "_3", name: "Marty McFly", stage: "follow", image: "../images/useravatar.png"}, {id: "_4",
    name: "Ofek",
    stage: "follow",
    image: "../images/useravatar.png"
}, {id: "_5",
    name: "Ofir",
    stage: "follow", image: "../images/useravatar.png"
},
    {id: "_6",name: "Sagi", stage: "follow", image: "../images/useravatar.png"}, {id: "_10",
        name: "Feldman",
        stage: "follow",
        image: "../images/useravatar.png"
    }, {id: "_7",
        name: "Amit",
        stage: "follow", image: "../images/useravatar.png"
    }, {id: "_8",name: "Yuval", stage: "follow", image: "../images/useravatar.png"}];

window.onload = function () {
    reloadExistingUsers();
    var filterhSearch = $("#filter-user").elements[0];


    filterhSearch.addEventListener("input", function () {
        filterUsers();
    });
};

var reloadExistingUsers = function () {
    var existingUsersSection =  $("#existing-users").elements[0];
    for (user of usersNames) {
        existingUsersSection.appendChild(UserSectionStructure(user, "col-md-2"));
    }
};

var UserSectionStructure = function (user, sectionSize) {

    var userSection = createDivElement();
    userSection.className = sectionSize;
    userSection.id = user.id;
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
    button.type = "button";
    var userName = createDivElement();
    userName.className = "userName";

    userSection.appendChild(thumbnail);
    thumbnail.appendChild(generalUser);
    generalUser.appendChild(userImage);
    generalUser.appendChild(userFollow);
    generalUser.appendChild(userName);
    userFollow.appendChild(button);
    userName.appendChild(document.createTextNode(user.name));
    button.value = (user.stage);
    userImage.setAttribute("src", user.image);
    button.onclick = function () {
        if (button.value == "follow") {
            showFolowee(user);
            changeStatus("folowees-users", user.id, "unfollow");
            changeStatus("existing-users", user.id, "unfollow");
        } else {
            changeStatus("existing-users", user.id, "follow");
            removeFollowee(user.id);
        }
    };

    return userSection;
};

var filterUsers = function(){
    var textToFilter =  $("#filter-user").elements[0].value;
    for(user of usersNames){
        if(!user.name.includes(textToFilter)){
            $("#existing-users" +  " #" + user.id).elements[0].style.display = "none";
        } else {
            $("#existing-users" +  " #" + user.id).elements[0].style.display = "block";
        }
    }
}

var changeStatus = function (sectionToChange, userId, status) {
    $("#" + sectionToChange +  " #" + userId).elements[0].getElementsByClassName("follow")[0].value = status;
}

var removeFollowee = function (userId) {
    $('#folowees-users #' + userId).elements[0].remove();
}

var showFolowee = function (user) {
    user.stage = "unfollow";
    var FoloweeSection = $("#folowees-users").elements[0];
    FoloweeSection.appendChild(UserSectionStructure(user, "col-md-12"));
}