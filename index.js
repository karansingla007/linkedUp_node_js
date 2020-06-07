const express = require('express')
const mongoose = require('mongoose')
const http = require('http');
const path = require('path')

const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// app.use(express.static(path.join(__dirname, 'client')));

require('./app/models/User')
require('./app/models/session')
require('./app/models/network')
require('./app/models/comments')


const port = process.env.PORT || 3000

let mongoUrl = 'mongodb+srv://varun_kumar:pass@121@@cluster0-jt4j3.mongodb.net/linkedUp?retryWrites=true&w=majority'

const server = http.createServer(app)
const io = require('socket.io')(server);

io.origins((origin, callback) => {
    console.log("origins callback");
    console.log(origin);
    callback(null, true);
});

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
mongoose.connect(mongoUrl, { useNewUrlParser: true })

/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    console.log('database connection error')
    console.log(err)
    process.exit(1)
}) // end mongoose connection error

mongoose.connection.on('open', (err) => {
    if (err) {
        console.log('database error')
        console.log(err)
    } else {
        console.log('database connection open success')
    }
}) // enr mongoose connection open handler

io.on('connection', (socket) => {
    socket.on('join_session', (userData) => {
        try {
        console.log('###########################join_session');
        let data = JSON.parse(userData)
        socket.join(data['sessionId'])
        socket.to(data['sessionId']).emit('session_joined', data);
        } catch(_) {
            console.log(_);
        }
    });

    socket.on('comment_send', (userData) => {
        try {
        console.log('###########################comment_send');
        let data = JSON.parse(userData)
        console.log(data['sessionId']);
        socket.to(data['sessionId']).emit('comment_receive', data);
        } catch(_) {
            console.log(_);
        }
    });

    socket.on('audio_change', (userData) => {
        try {
        console.log('###########################audio_changed');
        let data = JSON.parse(userData)
        socket.to(data['sessionId']).emit('audio_changed', data);
        // socket.emit('turn', data);
    } catch(_) {
        console.log(_);
    }
    });

    socket.on('remove_speaker', (userData) => {
        try{
        console.log('###########################out');
        let data = JSON.parse(userData)
        socket.to(data['sessionId']).emit('removed_speaker', data);
        socket.emit('removed_speaker', data);
    } catch(_) {
        console.log(_);
    }
    });

    socket.on('invite_viewer_to_become_speaker', (userData) => {
        try{
        console.log('###########################viewer_got_invitation');
        let data = JSON.parse(userData)
        socket.to(data['sessionId']).emit('viewer_got_invitation', data);
    } catch(_) {
        console.log(_);
    }
    });

});

const userController = require('./app/controllers/userController')

app.post('/loginSignUp', userController.loginSignUp)

app.put('/updateInfoWelcome', userController.updateUserInfoWelcome)

app.put('/updateFcmToken', userController.updateFcmToken)

app.put('/updateInfoDesignation', userController.updateUserInfoDesignation)

app.put('/updateInfoAge', userController.updateUserInfoAge)

app.get('/UserDetailById/:userId', userController.getUserDetailById)

app.get('/getUserDetailByPattern/:pattern/:userId', userController.getUserDetailByPattern)

app.put('/updateUserInfo', userController.updateUserInfo)


const sessionController = require('./app/controllers/sessionController')

app.post('/createSession', sessionController.createSession)

app.put('/updateSessionDetail', sessionController.updateSessionDetail)

app.delete('/deleteSession', sessionController.deleteSession)

app.get('/getSessionInfo/:sessionId', sessionController.getSessionInfo)

app.get('/getAllSessionOfUser/:userId', sessionController.getAllSessionOfUser)

app.get('/getLiveSessionListOfUser/:userId', sessionController.getLiveSessionListOfUser)

app.get('/getScheduleSessionListOfUser/:userId', sessionController.getScheduleSessionListOfUser)

app.get('/getEndedSessionListOfUser/:userId', sessionController.getEndedSessionListOfUser)

app.put('/updateSessionStatus/', sessionController.updateSessionStatus)


const networkController = require('./app/controllers/networkController')

app.post('/insertNetworkList', networkController.insertNetworkList)

app.get('/getNetworkById/:userId', networkController.getNetworkById)


const commentController = require('./app/controllers/commentController')

app.post('/insertCommentInList', commentController.insertCommentInList)

app.get('/getCommentListBySessionId/:sessionId', commentController.getCommentListBySessionId)

module.exports = app