'use strict'

const utils = require('fvi-node-utils')

const getPort = require('get-port')

const config = require('./config')
const server = require('./server')
const api = require('./api')

const getAvailablePort = async port => {
    if (utils.env.IS_TEST) {
        return await getPort({ port })
    }

    return port
}

const getConfig = async config => {
    const cfg = config.get('server')

    cfg.port = await getAvailablePort(cfg.port)

    return cfg
}

module.exports = async (cfg = null) => {
    const hasConfigParam = !!cfg

    if (hasConfigParam) {
        utils.objects.throwsIfNotConfig(cfg)
    } else {
        cfg = config()
    }

    utils.debug.here(`koa-server:config ${utils.objects.inspect(cfg.getProperties())}`)

    const serverConfig = await getConfig(cfg)

    const app = server(serverConfig)

    utils.debug.here(`Koa Server port=${serverConfig.port}`)

    // Here Config routers and return its, but here is not necessary return content
    api(app)

    return app
}
