
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const screens = new Schema({
    screenId: {
        type: String,
        default: '',
        unique: true
    },
    screenName: {
        type: String,
        unique: true
    },
    seatInfo: {
        type :Object
    },
    availableSeats : {
        type :Object
        
    },
    createdOn: {
        type: Date
    }
})


mongoose.model('Screens', screens)