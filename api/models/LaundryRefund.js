/**
 * LaundryRefund.js
 *
 * @description :: Laundry Refund Instance
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
    machine: {
      type: 'string',
      required: true
    },
    description: {
      type: 'text'
    },
    respondingRA: {
      type: 'json',
      required: true
    }
  }
};
