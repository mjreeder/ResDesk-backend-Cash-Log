
/**
 * VendingRefund.js
 *
 * @description :: Vending Refund Instance
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
    amount: {
      type: 'float',
      required: true
    },
    student: {
      type: 'json',
      required: true
    },
    description: {
      type: 'text'
    }
  }
};
