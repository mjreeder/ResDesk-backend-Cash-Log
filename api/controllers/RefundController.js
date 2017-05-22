/**
 * RefundController
 *
 * @description ::
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';
var util = require('util');
const ProfileService = require('../services/ProfileService.js');
const CashLogService = require('../services/CashLog.js');
var responseFormatter = require('../../helpers/format-response.js');

var getEmptyEntry = function () {
  return {
    cash: 0,
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0,
    found: 0,
    stamps: 0,
    postageDue: 0,
    laundryRefunds: 0,
    vendingRefunds: 0
  };
}

module.exports = {

  createRefund: function (request, response) {
    ProfileService.checkAuthHeader(request, response, function (user) {
      var body = request.swagger.params.RefundBody.value;
      if (body.type == 'Laundry') {
        var data = {
          createdBy: user,
          amount: body.data.amount,
          student: body.data.student,
          machine: body.data.machine,
          description: body.data.description ? body.data.description : null,
          respondingRA: body.data.respondingRA
        };

        LaundryRefund.create(data).exec(function (err, result) {
          if (err) {
            var output = responseFormatter.fail(err.description, err, 500);
            return response.status(output.status).json(output);
          }


          //generate new CashLog instance with updated price
          CashLogService.getLastEntry()
            .then(function (entry) {
              if (!entry) {
                entry = getEmptyEntry();
              } else {
                delete entry.id;
                delete entry.createdAt;
                delete entry.updatedAt;
              }

              entry.createdBy = user;
              entry.laundryRefunds += data.amount;

              CashLogService.createCashLog(entry)
                .then(function (innerRes) {
                  var output = responseFormatter.success("Laundry refund created, log updated.", innerRes);
                  response.status(output.status).json(output);
                }, function (err2) {
                  console.error(err2);
                  var output = responseFormatter.fail(err2.description, err2, 500);
                  return response.status(output.status).json(output);
                });

            }, function (error) {
              console.error(error);
              var output = responseFormatter.fail(error.description, error, 500);
              return response.status(output.status).json(output);
            });

          //          var output = responseFormatter.success("Laundry refund created", result);
          //          return response.json(output);
        });
      } else {
        var data = {
          createdBy: user,
          amount: body.data.amount,
          student: body.data.student,
          description: body.data.description ? body.data.description : null
        };

        VendingRefund.create(data).exec(function (err, result) {
          if (err) {
            var output = responseFormatter.fail(err.description, err, 500);
            return response.status(output.status).json(output);
          }

          //generate new CashLog instance with updated price
          CashLogService.getLastEntry()
            .then(function (entry) {
              if (!entry) {
                entry = getEmptyEntry();
              } else {
                delete entry.id;
                delete entry.createdAt;
                delete entry.updatedAt;
              }

              entry.createdBy = user;
              entry.vendingRefunds += data.amount;

              CashLogService.createCashLog(entry)
                .then(function (innerRes) {
                  var output = responseFormatter.success("Vending refund created, log updated.", innerRes);
                  response.status(output.status).json(output);
                }, function (err2) {
                  console.error(err2);
                  var output = responseFormatter.fail(err2.description, err2, 500);
                  return response.status(output.status).json(output);
                });

            }, function (error) {
              console.error(error);
              var output = responseFormatter.fail(error.description, error, 500);
              return response.status(output.status).json(output);
            });

          //          var output = responseFormatter.success("Vending refund created", result);
          //          return response.json(output);
        });
      }

    });
  }
};
