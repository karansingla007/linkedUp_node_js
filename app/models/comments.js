const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    commentId: {
        type: String,
        unique: true,
    },

    sessionId: {
        type: String,
        default: ''
    },

    commentText: {
        type: String,
        default: ''
    },

    user: {},

    createdAt: {
        type: String,
        default: ''
    }
})
mongoose.model('Comment', CommentSchema)