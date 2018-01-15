'use strict';

module.exports = router => {

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', {
            title: 'Express'
        });
    });

    return router;
}