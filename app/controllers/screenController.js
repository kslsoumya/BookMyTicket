const shortId = require('shortid');
const mongoose = require('mongoose')
const express = require('express')
const screenModel = mongoose.model('Screens')
// Libs----
const logger = require('../libs/loggerLib')
const apiResponse = require('../libs/responseLib')
const check = require('../libs/checkLib')
const timeLib = require('../libs/timeLib')

// Creating a Screen------------

let createScreen = (req, res) => {
    const uniqueId = shortId.generate()
    const today = timeLib.now();

    const seatsAvailable = {};
    for(var i in req.body.seatInfo) { 
        seatsAvailable[i] = [];
        for(var p=0;p< (req.body.seatInfo[i].numberOfSeats);p++) {
            seatsAvailable[i].push(p)
        } 
    }

    let screenEntry = new screenModel({
        screenId: uniqueId,
        screenName : req.body.name,
        seatInfo : req.body.seatInfo,
        availableSeats : seatsAvailable,
        createdOn : today
    })
    screenEntry.save((err, result) => {
        if (err) {
            logger.error(`Some Error Occured ${err}`, 'controller:createScreen', 10)
            let response = apiResponse.generate('error', err)
            res.send(response)
        } else {
            let response = apiResponse.generate('message','Added Successfully!!')
            res.send(response)
        }
    })
}






module.exports = {
    createScreen: createScreen
}

