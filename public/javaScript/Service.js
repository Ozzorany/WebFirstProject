function getAllUsers(){
    return axios.get('http://10.103.50.190:8000/users');
}

function getAllTweets(){
    return axios.get('http://10.103.50.190:8000/tweets');
}

function getAllFollowings(userId){
    return axios.get('http://10.103.50.190:8000/users/' + userId);
}

function getAllTweetsById(userId){
    return axios.get('http://10.103.50.190:8000/tweets/' + userId);
}

function getUserFollowers(userId){
    return axios.get('http://10.103.50.190:8000/users/following/' + userId);
}

var followingUser = function(userId, followeeId){
    axios.put('http://10.103.50.190:8000/following/' + userId +'/' + followeeId);
};

var putNewTweet = function(user){
    axios.put('http://10.103.50.190:8000/tweets', user);
};