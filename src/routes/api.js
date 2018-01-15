'use strict';
const routeModel = require('../model/routeModel');

module.exports = router => {

    router.use((req, res, next) => {
        let route = routeModel.getRouteByUrl(req.originalUrl);

        if (route) {
            res.status(route.response.status)
                .send(route.response.body);
        }

        next();
    });

    router.use((req, res) => {
        res.status(404)
            .send();
    });

    return router;
}