let allUsers = [];

function getUsers(tempUser){
    getAllUsers()
        .then(function (response) {
            for (user of response.data) {
                if(user._id !== tempUser) {
                    allUsers.push({id: user._id, name: user.username, stage: "follow", image: "images/useravatar.png"});
                }
            }
        }).catch(function (error) {
        console.log(error);
    });
}