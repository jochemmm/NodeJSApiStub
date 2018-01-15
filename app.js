'use strict';
require('dotenv').config();

const debug = require('debug');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const appInsightsConfig = require('./src/config/app-insights.config');
appInsightsConfig.init();

let app = express();

if (process.env.useAuth == "true") {
    const oAuthConfig = require('./src/config/oauth.config');
    oAuthConfig.init(app);
}

// set environment port
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, './src/public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')));

const routeModel = require('./src/model/routeModel');
const routeConfig = require('./src/config/routes.config');

routeModel.init();
routeConfig.init(express, app);

let server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;