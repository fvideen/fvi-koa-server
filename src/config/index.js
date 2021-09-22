'use strict'

const { config } = require('fvi-node-utils')

module.exports = () =>
  config({
    server: {
      name: {
        doc: 'HTTP Server Name',
        format: String,
        default: 'unknown-http-server',
        env: 'HTTP_SERVER_NAME',
        arg: 'http-server-name',
      },
      port: {
        doc: 'HTTP Server Port',
        format: 'port',
        default: 4000,
        env: 'HTTP_SERVER_PORT',
        arg: 'http-server-port',
      },
      version: {
        doc: 'HTTP Server Version',
        format: String,
        default: '1.0.0',
        env: 'HTTP_SERVER_VERSION',
        arg: 'http-server-version',
      },
    },
  })
