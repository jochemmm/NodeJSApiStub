'use strict';

const init = (express, app) => {
    const routes = require('../routes/index')(express.Router());
    const myroutes = require('../routes/myroutes')(express.Router());
    const dbroutes = require('../routes/dbroutes')(express.Router());
    const api = require('../routes/api')(express.Router());

    app.use('/', routes);

    if (process.env.useAuth == "true") {
        const authRoutes = require('../routes/authRoutes')(express.Router(), app);

        app.use('/auth', authRoutes);
        app.use('/myroutes', app.oauth.authorise(), myroutes);
    } else {
        app.use('/myroutes', myroutes);
    }

    app.use('/dbpage', dbroutes);
    app.use('/api', api);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: app.get('env') === 'development' ? err : {}
        });
    });
};

module.exports = {
    init: init
};