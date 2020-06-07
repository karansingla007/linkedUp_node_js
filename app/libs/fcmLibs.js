let mongoose = require('mongoose')
const UserModel = mongoose.model('User')

var FCM = require('fcm-node');
var serverKey = 'AAAA2CkDxnw:APA91bEirx9SskG7XI9OxE3ncyavVcAZvgfb5QjpZ4q1-zFHG9Wk9TLYW4WrpU8rsL951OzMxIpUEKHGB85DHsvmRhRWzRh929xy4kDMQgdZluqg_3SLGiSkK1RRoSBtucd6JTzLn4hM'; //put your server key here
var fcm = new FCM(serverKey);

function sendMessage(notificationData) {
    return new Promise(async (resolve, reject) => {
        try {
            const receiver = await UserModel.findOne({ 'userId': notificationData.receiverId }).select('firebaseId').lean();
            console.log('########################2');
            console.log(receiver);
            const message = {
                to: receiver.firebaseId,
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

            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            });
            resolve('success');
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    sendMessage,
}