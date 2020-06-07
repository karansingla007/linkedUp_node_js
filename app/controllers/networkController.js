let mongoose = require('mongoose')

let util = require('../libs/util')
/**Models */
const NetworkModel = mongoose.model('Network')

let insertNetworkList = async (req, res) => {
    try {
        let networkUserId = req.body.networkUserId;
        let userList = req.body.userList;
        console.log(networkUserId);

        let networkList = await NetworkModel.find({ networkUserId: networkUserId});

        if(userList != null) {
        for(var i=0;i<userList.length;i++) {
        var isUserPresent = false;
            for(var j=0;j<networkList.length;j++) {
                if(networkList[j].user.userId == userList[i].userId) {
                    isUserPresent = true;
                    break;
                }
            }

            if(!isUserPresent) {
                let createNetwork = new NetworkModel({
                    networkUserId: networkUserId,
                    user: userList[i],
                });
                
                let createdUser = await createNetwork.save();
            }
        }
        res.status(200).send({ statusCode: 200, })
    } else {
        res.status(500).send({ statusCode: 500, })
    }
        
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getNetworkById = async (req, res) => {
    try {
        let userId = req.params.userId;
        let findUser = await NetworkModel.find({ networkUserId: userId});
    
        res.status(200).send({ statusCode: 200, data: findUser })

    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}


module.exports = {
    insertNetworkList,
    getNetworkById
}