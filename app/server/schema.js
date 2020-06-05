'use strict'

const { joi } = require('fvi-node-utils/app/objects')

module.exports = joi.object({
    name: joi.string(),
    version: joi.string(),
    port: joi.number(),
})
