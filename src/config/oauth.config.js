'use strict';
const mySqlConnection = require('../databaseHelpers/mySqlWrapper');
const accessTokenDBHelper = require('../databaseHelpers/accessTokensDBHelper')(mySqlConnection);
const userDBHelper = require('../databaseHelpers/userDBHelper')(mySqlConnection);
const oAuthModel = require('../model/accessTokenModel')(userDBHelper, accessTokenDBHelper);
const oAuth2Server = require('node-oauth2-server');

const init = app => {
    app.oauth = oAuth2Server({
        model: oAuthModel,
        grants: ['password'],
        debug: true
    });

    app.use(app.oauth.errorHandler());
};

module.exports = {
    init: init
};