var getNameById = function (userId, usersWithNamesArray) {
    for (userWithNameData of usersWithNamesArray) {
        if (userId === userWithNameData._id) {
            return userWithNameData.username;
        }
    }

    return null;
};

// Testing
describe("DataProvider", function() {
    describe("gets user's name by his id", function() {
        let tempUsers = [{_id:"123", username:"oz"}];

        it("getNameById", function() {
            expect(getNameById("123",tempUsers)).toEqual("oz");
        });
    });
});
