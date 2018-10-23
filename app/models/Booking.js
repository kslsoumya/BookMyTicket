
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const bookings = new Schema({
    bookingId: {
        type: String,
        default: '',
        unique: true
    },
    user : {
        type : String
    },
    screenName: {
        type: String
    },
    seats : {
        type : Object
    },
    BookedOn: {
        type: Date
    }
})


mongoose.model('Bookings', bookings)