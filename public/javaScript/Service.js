function getAllUsers(){
    return axios.get('http://10.103.50.190:8000/users')
}

function getAllTweets(){
    return axios.get('http://10.103.50.190:8000/tweets')
}

function getAllFollowings(userId){
    return axios.get('http://10.103.50.190:8000/users/' + tempUser)
}

function postNewTweet(user){
    return axios.put('http://10.103.50.190:8000/tweets', user);
}