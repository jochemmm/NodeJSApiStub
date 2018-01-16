'use strict';
const routeModel = require('../model/routeModel');
const routeValidator = require('../validations/routeValidator');

module.exports = router => {

    router.get('/', (req, res) => {
        res.render('myroutes', {
            title: 'My Routes',
            model: routeModel.getRoutes(),
            access_token: req.query["access_token"]
        });
    });

    router.post('/add', routeValidator.validateAdd, (req, res) => {
        let newRoute = routeModel.createRoute(req.body);
        routeModel.addOrUpdateRoute(newRoute);

        res.redirect(`/myroutes?access_token=${req.body["access_token"]}`);
        res.send();
    });

    /** REST call for add routing */
    router.post('/', (req, res) => {
        let newRoute = req.body;
        routeModel.addOrUpdateRoute(newRoute);

        res.status(201)
            .send();
    });

    router.post('/delete', (req, res) => {
        let url = req.body["url"];
        routeModel.deleteRoute(url);

        res.redirect(`/myroutes?access_token=${req.body["access_token"]}`);
        res.send();
    });

    /** REST call for delete routing */
    router.delete('/', (req, res) => {
        let url = req.query["url"];
        routeModel.deleteRoute(url);

        res.status(204)
            .send();
    });

    return router;
}