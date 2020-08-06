'use strict'
const createError = require('http-errors');
const _ = require('lodash');
//imported thing

const _createErrorObject = (parameters) => {
        let errorMessage = '';
        errorMessage += _.size(parameters) == 1 ? parameters[0] : parameters.join(', ');
        errorMessage += ' required';
        return createError(400, errorMessage);
}

module = module.exports = (key, parameters) => {
        if (! parameters instanceof Array) throw createError(500, 'Expecting Array as parameters');
        return (req, res, next) => {
                let missingParameters = [];
                _.forEach(parameters, (parameter) => {
                        if (! _.has(req[key], parameter)) missingParameters.push(parameter);
                })
                _.size(missingParameters) == 0 ? next() : next(_createErrorObject(missingParameters));
        }
}
