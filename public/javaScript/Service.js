const ip = "http://10.103.50.190:8000";
const address ="";

function getAllUsers(){
    return axios.get(address + '/users');
}

function getAllTweets(){
    return axios.get(address +'/tweets');
}

function getAllFollowings(userId){
    return axios.get(address + '/users/' + userId);
}

function getAllTweetsById(userId){
    return axios.get(address + '/tweets/' + userId);
}

function getUserFollowers(userId){
    return axios.get(address + '/users/following/' + userId);
}

function registerUser(user){
    return axios.put(address + '/register' , user);
}

function userLogin(userData){
  return axios.put(address + '/login', userData);
}

function userLogOut(){
     axios.put(address + '/logOut');
}

var followingUser = function(userId, followeeId){
    axios.put(address + '/following/' + userId +'/' + followeeId);
};

var putNewTweet = function(user){
    axios.put(address + '/tweets', user);
};

function getUser(){
  return axios.get(address + '/session');
};
