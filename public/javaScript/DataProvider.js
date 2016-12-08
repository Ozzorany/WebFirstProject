var getNameById = function (userId, usersWithNamesArray) {
    for (userWithNameData of usersWithNamesArray) {
        if (userId === userWithNameData._id) {
            return userWithNameData.username;
        }
    }

    return null;
};