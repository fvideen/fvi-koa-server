'use strict'

const supportApi = require('./api-support')

module.exports = server => {
    return {
        supportApi: supportApi(server),
    }
}
