const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NetworkSchema = new Schema({
    networkUserId: {
        type: String,
        default: ''
    },
user: {},
    createdAt: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('Network', NetworkSchema)