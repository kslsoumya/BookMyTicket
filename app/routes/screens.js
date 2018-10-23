const express = require('express')
const config = require('../../config/appConfig')
const screenController = require('../controllers/screenController')
const bookingController = require('../controllers/bookingController')

let setRouter = (app) => {
    let baseUrl = config.apiVersion+'/'+'screens';

    // Routes regarding the screens -------------

  
    app.post(baseUrl,  screenController.createScreen);

      /**
   * @api {post}  /api/v1/screens   Add a screen
   * @apiVersion 0.0.1
   * @apiName  Add a screen
   * @apiGroup POST
   *
   * @apiParam {String} name  screenName paased as param
   * @apiParam {Object} seatInfo rows and seats.  passed as Body Param
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *                  {
   *                      message : 'Added Successfully'
   *                  }
   *
   */


    
    app.post(baseUrl + '/:screenName/reserve',  bookingController.reserveSeat);

    /**
   * @api {post}  /api/v1/screens/:screenName/reserve   Reserve a Seat
   * @apiVersion 0.0.1
   * @apiName  Reserve a Seat
   * @apiGroup POST
   *
   * @apiParam {String} name  screenName  passed as params
   * @apiParam {Object} seats rows and seats. paased as Body param
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *                  {
   *                      message : 'Reserved Successfully'
   *                  }
   *
   */

    app.get(baseUrl+'/:screenName/seats', bookingController.getAvailableSeats)

      /**
   * @api {get}  /api/v1/screens/:screenName/seats   Get Available Seats
   * @apiVersion 0.0.1
   * @apiName  Get Available Seats
   * @apiGroup GET
   *
   * @apiParam {String} name  screenName  passed as params
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *                  {
   *                      seats : {}
   *                  }
   *
   */


   }
   

module.exports = {
    setRouter: setRouter
}