'use strict';
const mySqlConnection = require('../databaseHelpers/mySqlWrapper');
const dbModel = require('../model/dbModel')(mySqlConnection);

module.exports = router => {

    router.get('/', (req, res) => {
        dbModel.selectTitle((title) => {
            res.render('dbpage', {
                title: title
            });
        });
    });

    return router;
}