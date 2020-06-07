let getRandomUserId = () => {
    let userId = '5';

    for (i = 0; i < 8; i++) {
        userId = userId + Math.floor(Math.random() * 10).toString();
    }
    return userId;
}

let getRandomSessionId = () => {
    let userId = '';

    for (i = 0; i < 11; i++) {
        userId = userId + Math.floor(Math.random() * 10).toString();
    }
    return userId;
}

let getRandomNumberUserName = () => {
    let randomNumber = '';

    // for (i = 0; i < 9; i++) {
    //     userId = userId + Math.floor(Math.random() * 10).toString();
    // }
    randomNumber = ((Math.floor(Math.random() * 20) + Math.floor(Math.random() * 10)) * (Math.floor(Math.random() * 25) + Math.floor(Math.random() * 50)) * (Math.floor(Math.random() * 30) + Math.floor(Math.random() * 50))) + Math.floor(Math.random() * 20);
    return randomNumber;
}


module.exports = {
    getRandomUserId,
    getRandomNumberUserName,
    getRandomSessionId
}