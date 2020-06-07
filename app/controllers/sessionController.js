let mongoose = require('mongoose')

let util = require('../libs/util')
let fcmLibs = require('../libs/fcmLibs')


/**Models */
const SessionModel = mongoose.model('Session')
const UserModel = mongoose.model('User')

let createSession = async (req, res) => {
    try {
        let title = req.body.title;
        let description = req.body.description;
        let sessionStartTimeStamp;
        if (req.body.sessionStartTimeStamp != null) {
            sessionStartTimeStamp = new Date(parseInt(req.body.sessionStartTimeStamp));
        }
        let hostUserId = req.body.hostUserId;
        let speakerUsers = req.body.speakerUsers;
        let sessionId = util.getRandomSessionId();

        let hostUser = await UserModel.findOne({ userId: hostUserId });

        let createSession = new SessionModel({
            sessionId: sessionId,
            title: title,
            description: description,
            sessionStartTimeStamp: sessionStartTimeStamp,
            hostUser: hostUser,
            speakerUsers: speakerUsers,
        });

        let createdSession = await createSession.save();

        let custome = {
            sessionId: createSession.sessionId,
        }
        setTimeout(() => {
            if (speakerUsers != null && speakerUsers.length > 0) {
                for (var i = 0; i < speakerUsers.length; i++) {
                    fcmLibs.sendMessage({ receiverId: speakerUsers[i]['userId'], notificationBody: `${hostUser['userName']} is create a meeting with you`, notificationTitle: 'meeting create', linkType: 'MEETING_CREATE', link: { type: 'MEETING_CREATE', id: sessionId }, });
                }
            }
        }, 500);

        res.status(200).send({ statusCode: 200, data: custome })


    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateSessionDetail = async (req, res) => {
    try {
        let sessionId = req.body.sessionId;
        let findSession = await SessionModel.findOne({ sessionId: sessionId });

        let hostUserId = req.body.hostUserId;
        let title = req.body.title;
        let description = req.body.description;
        let sessionStartTimeStamp = new Date(parseInt(req.body.sessionStartTimeStamp));
        let speakerUsers = req.body.speakerUsers;


        let createSession = {
            hostUserId: hostUserId,
            title: title,
            description: description,
            sessionStartTimeStamp: sessionStartTimeStamp,
            speakerUsers: speakerUsers,
        }

        let createdSession = await SessionModel.updateOne({ sessionId: sessionId }, createSession);
        let custome = {
            sessionId: sessionId,
        }
        res.status(200).send({ statusCode: 200, data: custome })
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let deleteSession = async (req, res) => {
    try {
        let sessionId = req.body.sessionId;

        let findSession = await SessionModel.findOne({ sessionId: sessionId });

        if (findSession != null) {
            await SessionModel.remove({ sessionId: sessionId });
            let custome = {
                status: 'session deleted',
            }
            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getSessionInfo = async (req, res) => {
    try {
        let sessionId = req.params.sessionId;

        let findSession = await SessionModel.findOne({ sessionId: sessionId });

        if (findSession != null) {
            res.status(200).send({ statusCode: 200, data: findSession })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getAllSessionOfUser = async (req, res) => {
    try {
        let userId = req.params.userId;

        // let findUser = await UserModel.findOne({ userId: userId });
        let findSession = await SessionModel.find({ "hostUser.userId": userId });

        if (findSession != null) {
            res.status(200).send({ statusCode: 200, data: findSession })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getLiveSessionListOfUser = async (req, res) => {
    try {
        let userId = req.params.userId;

        let findSession = await SessionModel.find({ $and: [{ $or: [{ "hostUser.userId": userId }, { "speakerUsers.userId": userId }] }, { status: "live" }] });
        // let findSession = await SessionModel.find({  $or : [{"hostUser.userId": userId}, {"speakerUsers.userId" : userId}] });

        if (findSession != null) {
            res.status(200).send({ statusCode: 200, data: findSession })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getScheduleSessionListOfUser = async (req, res) => {
    try {
        let userId = req.params.userId;

        let findSession = await SessionModel.find({ $and: [{ $or: [{ "hostUser.userId": userId }, { "speakerUsers.userId": userId }] }, { status: "schedule" }] });
        // let findSession = await SessionModel.find({  $or : [{"hostUser.userId": userId}, {"speakerUsers.userId" : userId}] });

        if (findSession != null) {
            res.status(200).send({ statusCode: 200, data: findSession })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getEndedSessionListOfUser = async (req, res) => {
    try {
        let userId = req.params.userId;

        let findSession = await SessionModel.find({ $and: [{ $or: [{ "hostUser.userId": userId }, { "speakerUsers.userId": userId }] }, { status: "ended" }] });
        // let findSession = await SessionModel.find({  $or : [{"hostUser.userId": userId}, {"speakerUsers.userId" : userId}] });

        if (findSession != null) {
            res.status(200).send({ statusCode: 200, data: findSession })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let updateSessionStatus = async (req, res) => {
    try {
        let sessionId = req.body.sessionId;

        let findSession = await SessionModel.findOne({ sessionId: sessionId });
        let speakerUsers = findSession['speakerUsers'];

        console.log('##################################SpeakerUsers');
        console.log(speakerUsers);

        if (findSession != null) {
            let status = req.body.status;
            let createSession = {
                status: status,
            }

            let createdSession = await SessionModel.updateOne({ sessionId: sessionId }, createSession);
            let custome = {
                sessionId: sessionId,
            }

            setTimeout(() => {
                if (speakerUsers != null && speakerUsers.length > 0) {
                    for (var i = 0; i < speakerUsers.length; i++) {
                        fcmLibs.sendMessage({ receiverId: speakerUsers[i]['userId'], notificationBody: `${hostUser['userName']} has start the meeting.`, notificationTitle: 'meeting started', linkType: 'MEETING_CREATE', link: { type: 'MEETING_START', id: sessionId }, });
                    }
                }
            }, 500);

            res.status(200).send({ statusCode: 200, data: custome })
        } else {
            res.status(500).send({ statusCode: 500, })
        }
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}


module.exports = {
    createSession,
    updateSessionDetail,
    deleteSession,
    getSessionInfo,
    getAllSessionOfUser,
    getLiveSessionListOfUser,
    getScheduleSessionListOfUser,
    getEndedSessionListOfUser,
    updateSessionStatus
}