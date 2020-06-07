const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },
    userName: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: String,
        default: ''
    },
    profilePicUrl: {
        type: String,
        default: ''
    },
    location: {
    type: String,
    default: ''
   },
   dateOfBirth: {
    type: String,
    default: ''
   },
   userType: {
    type: String,
    default: ''
   },
   designation: {
    type: String,
    default: ''
   },
   company: {
    type: String,
    default: ''
   },
   firebaseId: {
    type: String,
    default: ''
   },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('User', UserSchema)