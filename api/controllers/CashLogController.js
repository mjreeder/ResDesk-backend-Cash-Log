/**
 * LockoutController
 *
 * @description ::
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';
var util = require('util');
const ProfileService = require('../services/ProfileService.js');
const CashLog = require('../services/CashLog.js');
const responseFormatter = require('../../helpers/format-response.js');

module.exports = {

  getCashLogs: function (request, response) {
    ProfileService.checkAuthHeader(request, response, function (user) {
      CashLog.getCashLogs(request, response);
    });
  },
  getRecentCashLogs: function (request, response) {
    ProfileService.checkAuthHeader(request, response, function (user) {
      CashLog.getRecentCashLogs(request, response);
    });
  },
  getLastCashLog: function (request, response) {
    ProfileService.checkAuthHeader(request, response, function (user) {
      CashLog.getLastEntry()
        .then(function (entry) {
          var formatted = responseFormatter.success("Last cash log item.", entry, 200);
          response.status(formatted.status).json(formatted);
        }, function (err) {
          var formatted = responseFormatter.fail("Last cash log item.", err, 500);
          response.serverError(formatted);
        });
    });
  },
  createCashLog: function (request, response) {
    var entry = {
      cash: request.param('cash'),
      quarters: request.param('quarters'),
      dimes: request.param('dimes'),
      nickels: request.param('nickels'),
      pennies: request.param('pennies'),
      found: request.param('found'),
      stamps: request.param('stamps'),
      postageDue: request.param('postageDue'),
      laundryRefunds: request.param('laundryRefunds'),
      vendingRefunds: request.param('vendingRefunds')
    };
    
    ProfileService.checkAuthHeader(request, response, function (user) {

      entry.createdBy = user;
      
      CashLog.createCashLog(entry)
        .then(function (result) {
          var res = responseFormatter.success("Cash log created.", result);
          response.status(res.status).json(res);
        }, function (err) {
          var res = responseFormatter.fail("Error creating cash log", err);
          response.status(res.status).json(res);
        });
    });
  }
};
