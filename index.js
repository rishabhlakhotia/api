const getdata = require('./utils/getdata');
const mongo = require('./utils/mongo');
require('dotenv').config();


setInterval(function () {
  var filename = './raw_data.json'

  getdata.getRawData(filename, (res) => {
    if (res) {
      mongo.sendToMongo(filename, 'raw_data', 'raw_data');
      console.log("ops completed");
    }
  });
}, 100000);

setInterval(function () {
  var filename = './data.json'

  getdata.getData(filename, (res) => {
    if (res) {
      mongo.sendToMongo(filename, 'data', 'cases_time_series');
      console.log("ops completed");
    }
  });
}, 100000);
