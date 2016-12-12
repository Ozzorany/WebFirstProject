describe("UserApi", function () {
    var userAccessor = require('../../UserApi/userApi');

    beforeAll(function (done) {
        userAccessor.getAllUsers().then(done);
    });

    describe("Should get a user followees by ID", function () {
        it("should return the user followes if the id is valid", function () {
            followes = userAccessor.getFollowees('ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22');
            expect(followes).not.toBe(undefined);
        });

        it("should return null if id is not valid", function () {
            user = userAccessor.getFollowees('This is a Fake ass ID');
            expect(user).toBeNull();
        });
    });

    describe("Should get a user followers ID", function () {
        it("should return the user followers if the id is valid", function (done) {
            users = [{
                _id: "10c06b27-d8ee-4435-9cee-0a2a838ca14a",
                username: "Marta",
                password: "deserunt",
                following: [
                    "cc707c95-f1e3-4caf-906d-f9dd1f394b99"
                ]
            },
                {
                    _id: "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22",
                    username: "Butler",
                    password: "consequat",
                    following: [
                        "10c06b27-d8ee-4435-9cee-0a2a838ca14a"
                    ]
                }]

            user = userAccessor.getAllUserFollowers(users, '10c06b27-d8ee-4435-9cee-0a2a838ca14a');
            expect(user).not.toBe(undefined);
            done();
        });

        it("should return undefined if id is not valid", function (done) {
            usersBadId = [{
                _id: "10c06b27-d8ee-4435-9cee-0a2a838ca14a",
                username: "Marta",
                password: "deserunt",
                following: [
                    "cc707c95-f1e3-4caf-906d-f9dd1f394b99"
                ]
            },
                {
                    _id: "ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22",
                    username: "Butler",
                    password: "consequat",
                    following: [
                        "10c06b27-d8ee-4435-9cee-0a2a838ca14a"
                    ]
                }];

            user = userAccessor.getAllUserFollowers(usersBadId, 'not good');
            expect(user.length).toBe(0);
            done();

        });
    });
});
