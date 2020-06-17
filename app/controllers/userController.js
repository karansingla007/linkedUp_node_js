let mongoose = require('mongoose')

let util = require('../libs/util')
/**Models */
const UserModel = mongoose.model('User')

let loginSignUp = async (req, res) => {
    try {
        let email = req.body.email;
        let mobileNumber = req.body.mobileNumber;
        let profilePicUrl = req.body.profilePicUrl;

        let findUser;
        if(email != null) {
         findUser = await UserModel.findOne({ email: email });
        } else if(mobileNumber != null) {
         findUser = await UserModel.findOne({ mobileNumber: mobileNumber });
        }
        console.log(findUser);
        
        if (findUser == null) {
            //signup code
            
            let userId = util.getRandomUserId(); 
            
            console.log(userId);
            let userName = req.body.userName + util.getRandomNumberUserName().toString();
            
            let createUser = new UserModel({
                userId: userId,
                userName: userName,
                email: email,
                mobileNumber: mobileNumber,
                profilePicUrl: profilePicUrl,
            });
            
            let createdUser = await createUser.save();
            let custome = {
                userName: createUser.userName,
                email: createUser.email,
                userId: createUser.userId,
                profilePicUrl: createUser.profilePicUrl,
                mobileNumber: createUser.mobileNumber,
                isNew: true,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            //login code
            
            let custome = {
                userName: findUser.userName,
                email: findUser.email,
                mobileNumber: findUser.mobileNumber,
                userId: findUser.userId,
                profilePicUrl: findUser.profilePicUrl,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                isNew: false,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        }

    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateUserInfoWelcome = async (req, res) => {
    try {
        let userId = req.body.userId;
        let userName = req.body.userName;
        console.log(userId);
        let findUser = await UserModel.findOne({ userId: userId });
        console.log(findUser);

        if (findUser != null) {
            let findUserName = await UserModel.findOne({ userName: userName });
            if(findUserName != null && findUserName['userId'] != userId) {
                let custome = {
                    isUserNameAvailable: false,
                }
                res.status(200).send({ statusCode: 200, data: custome })
            }  else {

            let userName = req.body.userName;
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let location = req.body.location;
            

            let createUser = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            location: location,
            }

            let createdUser = await UserModel.updateOne({userId: userId}, createUser);
            let custome = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                location: location,
                isUserNameAvailable: true,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        }
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateUserInfoDesignation = async (req, res) => {
    try {
        let userId = req.body.userId;

        let findUser = await UserModel.findOne({ userId: userId });
        
        console.log(findUser);
if(findUser != null) {
            let userType = req.body.userType;
            let designation = req.body.designation;
            let company = req.body.company;
            

            let createUser = {
                userType: userType,
            designation: designation,
            company: company,
            }

            let createdUser = await UserModel.updateOne({userId: userId}, createUser);
            let custome = {
                userId: userId,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateUserInfoAge = async (req, res) => {
    try {
        let userId = req.body.userId;

        let findUser = await UserModel.findOne({ userId: userId });
        
        console.log(findUser);
if(findUser != null) {
            let dateOfBirth = req.body.dateOfBirth;
            

            let createUser = {
                dateOfBirth: dateOfBirth,
            }

            let createdUser = await UserModel.updateOne({userId: userId}, createUser);
            let custome = {
                userId: userId,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateUserInfoProficPicUrl = async (req, res) => {
    try {
        let userId = req.body.userId;

        let findUser = await UserModel.findOne({ userId: userId });
        
        console.log(findUser);
if(findUser != null) {
            let profilePicUrl = req.body.profilePicUrl;
            

            let createUser = {
                profilePicUrl: profilePicUrl,
            }

            let createdUser = await UserModel.updateOne({userId: userId}, createUser);
            let custome = {
                userId: userId,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateFcmToken = async (req, res) => {
    try {
        let fcmToken = req.body.fcmToken;
        let userId = req.body.userId;

        let findUser = await UserModel.findOne({ userId: userId });
       
        if(findUser != null) {
        
            let createUser = {
                firebaseId: fcmToken,
            }

            let createdUser = await UserModel.updateOne({userId: userId}, createUser);
            let custome = {
                userId: userId,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateUserInfo = async (req, res) => {
    try {
        let userId = req.body.userId;
        let userName = req.body.userName;

        let findUser = await UserModel.findOne({ userId: userId });
       
        if(findUser != null) {

            let findUserName = await UserModel.findOne({ userName: userName });
            var isUserNameAvailable = false;
            if(findUserName == null) {
                isUserNameAvailable = true;
            } else {
                if(findUserName.userId == findUser.userId) {
                    isUserNameAvailable = true;
                } else {
                    isUserNameAvailable = false;
                }
            }
        if(isUserNameAvailable) {
            let userName = req.body.userName;
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let userType = req.body.userType;
            let designation = req.body.designation;
            let company = req.body.company;
            let location = req.body.location;
            let email = req.body.email;
            let mobileNumber = req.body.mobileNumber;

            let createUser = {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                userType: userType,
                designation: designation,
                company: company,
                location: location,
                email: email,
                mobileNumber: mobileNumber
            }

            let createdUser = await UserModel.updateOne({userId: userId}, createUser);
        }
            let custome = {
                userId: userId,
                isUserNameAvailable: isUserNameAvailable,
            }
            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getUserDetailById = async (req, res) => {
    try {
        let userId = req.params.userId;
        let findUser = await UserModel.findOne({ userId: userId});
    
        res.status(200).send({ statusCode: 200, data: findUser })

    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getUserDetailByPattern = async (req, res) => {
    try {
        let pattern = req.params.pattern;
        let userId = req.params.userId;
        let allUser = await UserModel.find({});
        let matchedUsers = [];

        for (var i=0;i<allUser.length;i++) {  
            if((allUser[i]['userName'].search(pattern)) != -1 && allUser[i]['userId'] != userId) {
                matchedUsers.push(allUser[i]);
            }
          }
          for (var i=0;i<allUser.length;i++) {  
            if((allUser[i]['firstName'].search(pattern)) != -1 && allUser[i]['userId'] != userId) {
                matchedUsers.push(allUser[i]);
            }
          }

          for (var i=0;i<allUser.length;i++) {  
            if((allUser[i]['email'] != null && allUser[i]['email'].search(pattern)) != -1 && allUser[i]['userId'] != userId) {
                matchedUsers.push(allUser[i]);
            }
          }
          var uSet = new Set(matchedUsers);
        res.status(200).send({ statusCode: 200, data: [...uSet] })

    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

module.exports = {
    loginSignUp,
    updateUserInfoWelcome,
    getUserDetailById,
    updateUserInfoDesignation,
    updateUserInfoAge,
    getUserDetailByPattern,
    updateFcmToken,
    updateUserInfo,
    updateUserInfoProficPicUrl
}