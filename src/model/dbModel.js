'use strict';
let mySqlConnection;

const selectTitle = (callback) => {
    mySqlConnection.query('SELECT \'My database value\' AS title', dataResponseObject => {
        if (dataResponseObject.error) throw dataResponseObject.error;

        let title = dataResponseObject.results[0].title;
        callback(title);
    });
};

module.exports = injectedMySqlConnection => {
    mySqlConnection = injectedMySqlConnection;

    return {
        selectTitle: selectTitle
    };
}