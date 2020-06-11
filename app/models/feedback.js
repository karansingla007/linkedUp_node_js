const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedbackSchema = new Schema({
    userId: {
        type: String,
    },

    feedbackTitle: {
        type: String,
        default: ''
    },

    feedbackDescription: {
        type: String,
        default: ''
    },

    brand: {
        type: String,
        default: ''
    },

    device: {
        type: String,
        default: ''
    },

    manufacturer: {
        type: String,
        default: ''
    },

    model: {
        type: String,
        default: ''
    },

    product: {
        type: String,
        default: ''
    },

    versionCodename: {
        type: String,
        default: ''
    },

    versionIncremental: {
        type: String,
        default: ''
    },

    versionPreviewSdk: {
        type: String,
        default: ''
    },

    versionRelase: {
        type: String,
        default: ''
    },

    versionSdk: {
        type: String,
        default: ''
    },

    versionSecurityPatch: {
        type: String,
        default: ''
    },

    createdAt: {
        type: String,
        default: ''
    }
})
mongoose.model('Feedback', FeedbackSchema)