'use strict';
const { body, validationResult } = require('express-validator/check');
const isJSON = require('is-valid-json');

const validationChecks = [
    body("response.body", "Response body is not a JSON string")
        .optional({ checkFalsy: true })
        .custom((value, { req }) => isJSON(value))
];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            failures: errors.mapped()
        });
    }

    return next();
};

module.exports = {
    validateAdd: validationChecks.concat(validationHandler)
};