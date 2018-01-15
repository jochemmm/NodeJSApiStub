'use strict';
const mySql = require('mysql');

const options = {
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.database
};

/**
 * executes the specified sql query and provides a callback which is given
 * with the results in a DataResponseObject
 *
 * @param queryString
 * @param callback - takes a DataResponseObject
 */
const query = (queryString, callback) => {
  //init connection object needs to be done everytime as well calling connection.end() after the call is complete
  let connection = mySql.createConnection(options);
  connection.connect();

  //execute the query and collect the results in the callback
  connection.query(queryString, function (error, results, fields) {
    console.log('mySql: query: error is: ', error, ' and results are: ', results);

    connection.end();

    callback({
      error: error,
      results: results === undefined ? null : results
    });
  });
};

module.exports = {
  query: query
};