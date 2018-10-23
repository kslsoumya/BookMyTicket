const shortId = require('shortid');
const mongoose = require('mongoose')
const express = require('express')
const screenModel = mongoose.model('Screens')
const bookingModel = mongoose.model('Bookings')
// Libs----
const logger = require('../libs/loggerLib')
const apiResponse = require('../libs/responseLib')
const check = require('../libs/checkLib')
const timeLib = require('../libs/timeLib')


// Reserve a Seat------------

let reserveSeat = (req, res) => {
    // console.log(req.body.seats+'seats------')
    const uniqueId = shortId.generate()
    const today = timeLib.now();

    let bookingEntry = new bookingModel({
        bookingId: uniqueId,
        screenName: req.params.screenName,
        seats: req.body.seats,
        BookedOn: today
    })
    let available = false;
    findSeats(req.params.screenName).then((resolve) => {
        //  console.log(req.body.seats+'resolve-----')

        for (var key in req.body.seats) {
            console.log(req.body.seats + '---seats')
            req.body.seats[key].forEach(element => {
                console.log(key + 'keyyyyyyyy')
                if (resolve.availableSeats[key] !== undefined && resolve.availableSeats[key].indexOf(element) !== -1) {
                    available = true
                } else {
                    available = false;
                }
            });
        }
        if (available) {
            for (var key in req.body.seats) {
                req.body.seats[key].forEach(element => {
                    var index = resolve.availableSeats[key].indexOf(element);
                    resolve.availableSeats[key].splice(index, 1);
                });
            }
            let options ={
                availableSeats : resolve.availableSeats
            }
            screenModel.update({ 'screenName': req.params.screenName }, options).exec((err, result) => {
                if (err) {
                    logger.error(`Some Error Occured ${err}`, 'controller:reserveSeat', 10)
                    let response = apiResponse.generate('error', err)
                    res.send(response)
                }
                else {
                    bookingEntry.save((err, result) => {
                        if (err) {
                            logger.error(`Some Error Occured ${err}`, 'controller:reserveSeat', 10)
                            let response = apiResponse.generate('error', err)
                            res.send(response)
                        } else {
                            let response = apiResponse.generate('message', 'Seats reserved Successfully!!')
                            res.send(response)

                        }
                    })
                }
            })
        }
        else {
            let response = apiResponse.generate('message', 'Seats not available');
            res.send(response)
        }
    })

}


// Get available seats------------

let getAvailableSeats = (req, res) => {
    findSeats(req.params.screenName).then((resolve) => {
        logger.info('Screen Found', 'Booking Controller:getAvailableSeats()', 10)
        let response = apiResponse.generate('seats', resolve.availableSeats);
        res.send(response)
    })
}

let findSeats = (name) => {
    return new Promise((resolve, reject) => {
        screenModel.findOne({ 'screenName': name }, (err, screenDetails) => {
            if (err) {
                logger.error('Failed to retrieve Screen Details', 'Booking Controller:getAvailableSeats()', 4)
                let apiResponse = response.generate('message', 'Failed to Find Screen Details')
                reject(apiResponse)

            } else if (check.isEmpty(screenDetails)) {
                logger.error('No Screen Found', 'Booking Controller:getAvailableSeats()', 4)
                let apiResponse = response.generate('message', 'No Screen Found')
                reject(apiResponse)
            } else {
                resolve(screenDetails)
            }
        })
    })
}


module.exports = {
    reserveSeat: reserveSeat,
    getAvailableSeats: getAvailableSeats
}

