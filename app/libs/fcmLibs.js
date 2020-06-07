let mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const FCM = require("firebase-admin");

const serviceAccount = require("../../config/firebase_config.json");

try {
    console.log('########################1');
FCM.initializeApp({
  credential: FCM.credential.cert(serviceAccount),
  databaseURL: "https://linked-up-29119.firebaseio.com"
}, 'Primary');
} catch(err) {
    console.log('########################');
    console.log(err);
}

function sendMessage(notificationData) {
    return new Promise(async (resolve, reject) => {
        try {
            const receiver = await UserModel.findOne({ 'userId': notificationData.receiverId }).select('firebaseId').lean();
            console.log('########################2');
            console.log(receiver);
            const message = {
                token: receiver.firebaseId,
                'android': {
                    priority: 'high'
                },
                'notification': {
                    title: notificationData.notificationTitle,
                    body: notificationData.notificationBody
                },
                'data': {
                    'linkType': "" + notificationData.linkType + "",
                    'link': "" + JSON.stringify(notificationData.link) + "",
                    'title': "" + notificationData.notificationTitle + "",
                    'body': "" + notificationData.notificationBody + "",
                    'click_action': "FLUTTER_NOTIFICATION_CLICK"
                }
            };
            console.log('########################4');
            console.log(message);
            FCM.messaging().send(message).then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                resolve(response)
            })
                .catch((error) => {
                    console.log(error);
                    // reject(error)
                });
        } catch (err) {
            console.log('########################3');
            console.log(err);
            reject(err);
        }
    })
}

// ​let sendMessage = (notificationData) => {
   
// }

module.exports = {
    sendMessage,
}

