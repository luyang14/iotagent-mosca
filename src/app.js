"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const dojot = require("@dojot/dojot-module-logger");
const healthCheck = require('@dojot/healthcheck');
const logger = require("@dojot/dojot-module-logger").logger;

const TAG = {filename: "app"};

var isInitialized = false;
var httpServer;

function initApp(healthChecker) {
    const app = express();

    app.use(bodyParser.json());
    app.use(healthCheck.getHTTPRouter(healthChecker));
    app.use(dojot.getHTTPRouter());

    logger.debug("Initializing configuration endpoints...", TAG);

    httpServer = app.listen(10011, () => {
        logger.info(`Listening on port 10011.`, TAG);
        isInitialized = true;
    });
    logger.debug("... configuration endpoints were initialized", TAG);
}

function stopApp() {
    if(isInitialized) {
        httpServer.close();
    }
}

module.exports = {
    initApp, stopApp
};

