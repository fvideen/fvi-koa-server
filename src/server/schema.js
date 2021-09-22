'use strict'

const { objects } = require('fvi-node-utils')

module.exports = objects.joi.object({
  name: objects.joi.string(),
  version: objects.joi.string(),
  port: objects.joi.number(),
})
