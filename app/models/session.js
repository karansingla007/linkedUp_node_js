const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    sessionId: {
        type: String,
        unique: true
    },
    hostUser: {
    },
    speakerUsers: {
        type: Array,
        default: [],
    },
    isSessionFinished: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'schedule'
    },
    sessionStartTimeStamp: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('Session', SessionSchema)