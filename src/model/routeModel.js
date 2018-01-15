'use strict';
const fs = require('fs');
const routesFile = './src/model/dynamicRoutes.json';

let dynamicRoutes;

const readRoutesFromFile = () => {
    let rawData = fs.readFileSync(routesFile);
    return JSON.parse(rawData);
};

const storeRoutesToFile = () => {
    fs.writeFileSync(routesFile, JSON.stringify(dynamicRoutes));
};

const getRoutes = () => {
    return dynamicRoutes;
};

const getRouteByUrl = url => {
    return dynamicRoutes.find((element) => {
        return element.url === url;
    });
};

const createRoute = form => {
    let responseBody = undefined;

    if (form["response.body"] && form["response.body"].length > 0) {
        responseBody = JSON.parse(form["response.body"]);
    }

    return {
        url: form["url"],
        method: form["method"],
        response: {
            status: form["response.status"],
            body: responseBody
        }
    };
};

const addOrUpdateRoute = newRoute => {
    let existingRoute = getRouteByUrl(newRoute.url);

    if (existingRoute) {
        let index = dynamicRoutes.indexOf(existingRoute);
        dynamicRoutes.splice(index, 1, newRoute);
    } else {
        dynamicRoutes.push(newRoute);
    }

    storeRoutesToFile();
};

const deleteRoute = url => {
    let existingRoute = getRouteByUrl(url);

    if (existingRoute) {
        let index = dynamicRoutes.indexOf(existingRoute);
        dynamicRoutes.splice(index, 1);

        storeRoutesToFile();
    }
};

const init = () => {
    dynamicRoutes = readRoutesFromFile();
}

module.exports = {
    init: init,
    getRoutes: getRoutes,
    getRouteByUrl: getRouteByUrl,
    createRoute: createRoute,
    addOrUpdateRoute: addOrUpdateRoute,
    deleteRoute: deleteRoute
};