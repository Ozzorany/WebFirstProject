describe("TweetingApi", function () {
    var tweetAccessor = require('../../TweetingApi/tweetingApi');

    beforeAll(function (done) {
        tweetAccessor.getAllUserTweets("ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22").then(done);
    });

    describe("Should get a user tweets by ID", function () {
        it("should return the user tweets if the id is valid", function (done) {
            tweet = tweetAccessor.getAllUserTweets('ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22');
            expect(tweet).not.toBe(undefined);
            done();
        });

        it("should return empty array if tweet is not valid", function (done) {
            tweetAccessor.getAllUserTweets('This is a Fake ass ID')
                .then(user => {
                    expect(user.length).toBe(0);
                    done();
                });
        });
    });
});
