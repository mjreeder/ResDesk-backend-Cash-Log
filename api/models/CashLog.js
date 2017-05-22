/**
 * CashLog.js
 *
 * @description :: Cash Log Item
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    _id: {
      type: 'string'
    },
    createdBy: {
      type: 'json'
    },
    cash: {
      type: 'float',
      required: true
    },
    quarters: {
      type: 'float',
      required: true
    },
    dimes: {
      type: 'float',
      required: true
    },
    nickels: {
      type: 'float',
      required: true
    },
    pennies: {
      type: 'float',
      required: true
    },
    found: {
      type: 'float',
      required: true
    },
    stamps: {
      type: 'float',
      required: true
    },
    postageDue: {
      type: 'float',
      required: true
    },
    laundryRefunds: {
      type: 'float',
      required: true
    },
    vendingRefunds: {
      type: 'float',
      required: true
    }
  }
};
