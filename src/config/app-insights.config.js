'use strict';
const appInsights = require('applicationinsights');

module.exports = {
    init: () => {
        appInsights.setup("3d150853-abcc-47b0-bbfa-0beade21e7e8");
        appInsights.start();
    }
}