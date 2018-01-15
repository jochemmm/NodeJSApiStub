'use strict';
const mySqlConnection = require('../databaseHelpers/mySqlWrapper');
const userDBHelper = require('../databaseHelpers/userDBHelper')(mySqlConnection);

module.exports = (router, app) => {

    router.get('/registerUser', (req, res) => {
        res.render('registeruser', {});
    });

    router.post('/registerUser', (req, res) => {
        userDBHelper.doesUserExist(req.body.username, (sqlError, doesUserExist) => {
            //check if the user exists
            if (sqlError !== null || doesUserExist) {
                const message = sqlError !== null ? "Operation unsuccessful" : "User already exists";
                const error = sqlError !== null ? sqlError : "User already exists";

                // return message and detailed error
                sendResponse(res, message, error);
                return;
            }

            //register the user in the db
            userDBHelper.registerUserInDB(req.body.username, req.body.password, dataResponseObject => {
                const message = dataResponseObject.error === null ? "Registration was successful" : "Failed to register user";

                sendResponse(res, message, dataResponseObject.error);
            });
        });
    });

    const sendResponse = (res, message, error) => {
        res.render('registeruser', {
            message: message,
            error: error
        });
    };

    router.get('/login', (req, res) => {
        res.render('login', {
            returnUri: req.query["return_uri"] || '/myroutes'
        });
    });

    const login = (req, res) => {
        res.redirect("/myroutes");
        res.send();
    };

    router.post('/login', app.oauth.grant(), login);

    return router;
}