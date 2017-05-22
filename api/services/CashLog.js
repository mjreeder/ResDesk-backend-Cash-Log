var responseFormatter = require('../../helpers/format-response.js');

function getCashLogs(req, res) {

  CashLog.find({
    sort: {
      createdAt: 'DESC'
    }
  }).exec(function (err, result) {
    if (err) {
      return res.serverError(err);
    }
    var response = responseFormatter.success("All cash log items.", result);
    res.status(response.status).json(response);
  });
}

function getRecentCashLogs(req, res) {

  //Date formatted as MM/DD/YYYY
  var newDate = req.swagger.params.date.value || "";

  //Get cash logs for specific date
  if (newDate !== "") {
    var startDate = new Date(newDate);
    var endDate = new Date(startDate.getTime() + (60 * 60 * 24 * 1000));
    var where = {
      createdAt: {
        '>=': startDate,
        '<': endDate
      }
    };
    //Get recent cash logs
  } else {
    var days = 1;
    var date = new Date();
    var lastWeek = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var where = {
      createdAt: {
        '>=': lastWeek
      }
    };
  }

  CashLog.find({
    sort: {
      createdAt: 'DESC'
    }
  }).where(where).exec(function (err, result) {
    if (err) {
      return res.serverError(err);
    }
    var response = responseFormatter.success("All cash log items.", result);
    res.status(response.status).json(response);
  });
}

function createCashLog(entry) {

  return new Promise((resolve, reject) => {
    CashLog.create(entry).exec(function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  })
}


function getLastEntry() {
  var prom = new Promise((resolve, reject) => {
    CashLog.find({
      sort: {
        'createdAt': 'DESC'
      },
      limit: 1
    }).exec(function (err, entry) {
      if (err) {
        reject(err);
        return;
      }
      if (entry.length == 0) {
        resolve(null);
        return;
      }
      resolve(entry[0]);
    });
  });
  return prom;
}

module.exports = {
  getCashLogs: getCashLogs,
  getRecentCashLogs: getRecentCashLogs,
  createCashLog: createCashLog,
  getLastEntry: getLastEntry
}
