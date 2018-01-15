let mySqlConnection;

/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param username
 * @param password
 * @param registrationCallback - takes a DataResponseObject
 */
const registerUserInDB = (username, password, registrationCallback) => {
  const registerUserQuery = `INSERT INTO users (username, user_password) VALUES ('${username}', SHA('${password}'))`

  mySqlConnection.query(registerUserQuery, registrationCallback);
};

/**
 * Gets the user with the specified username and password.
 * It provides the results in a callback which takes an:
 * an error object which will be set to null if there is no error.
 * and a user object which will be null if there is no user
 *
 * @param username
 * @param password
 * @param callback - takes an error and a user object
 */
const getUserFromCrentials = (username, password, callback) => {
  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`

  console.log('getUserFromCrentials query is: ', getUserQuery);

  mySqlConnection.query(getUserQuery, (dataResponseObject) => {
    //pass in the error which may be null and pass the results object which we get the user from if it is not null
    callback(false, dataResponseObject.results !== null && dataResponseObject.results.length === 1 ? dataResponseObject.results[0] : null)
  });
};

/**
 * Determines whether or not user with the specified userName exists.
 * It provides the results in a callback which takes 2 parameters:
 * an error object which will be set to null if there is no error, and
 * secondly a boolean value which says whether or the user exists.
 * The boolean value is set to true if the user exists else it's set
 * to false or it will be null if the results object is null.
 *
 * @param username
 * @param callback - takes an error and a boolean value indicating whether a user exists
 */
const doesUserExist = (username, callback) => {
  const doesUserExistQuery = `SELECT * FROM users WHERE username = '${username}'`;

  //holds the results from the query
  const sqlCallback = (dataResponseObject) => {

    //calculate if user exists or assign null if results is null
    const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null;

    //check if there are any users with this username and return the appropriate value
    callback(dataResponseObject.error, doesUserExist);
  };

  //execute the query to check if the user exists
  mySqlConnection.query(doesUserExistQuery, sqlCallback);
};

module.exports = injectedMySqlConnection => {
  mySqlConnection = injectedMySqlConnection;

  return {
    registerUserInDB: registerUserInDB,
    getUserFromCrentials: getUserFromCrentials,
    doesUserExist: doesUserExist
  };
}