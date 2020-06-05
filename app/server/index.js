/**
 * SERVER - index.ts
 *
 * Exporta uma função que cria um servidor
 * configurado a partir de uma instancia de
 * {Http} da API Nodejs.
 */
const Koa = require('koa')

const cors = require('@koa/cors')
const errorHandler = require('koa-better-error-handler')
const error404 = require('koa-404-handler')

const helmet = require('koa-helmet')
const logger = require('koa-logger')
const bodyParser = require('koa-body')

const ip = require('ip')
const utils = require('fvi-node-utils')

const configSchema = require('./schema')

const _env = cfg => {
    const user = process.env.USER
    const port = cfg.port
    const environment = process.env.NODE_ENV || utils.env.DEVELOPMENT

    return {
        ip: ip.address(),
        user,
        port,
        environment,
    }
}

const _info = cfg => {
    return {
        name: cfg.name,
        version: cfg.version,
    }
}

const server = cfg => {
    utils.objects.joi.assert(cfg, configSchema)

    const app = new Koa()

    app.context.onerror = errorHandler
    app.use(error404)
    app.use(cors())
    app.use(helmet())
    app.use(logger())
    app.use(bodyParser())

    const env = _env(cfg)
    const info = _info(cfg)

    app.env = env
    app.info = info

    const server = app.listen(env.port)

    utils.debug.here(`[Koa Server]: process.env=${utils.objects.inspect({ process: process.env })}`)
    utils.debug.here(`[Koa Server]: server.env=${utils.objects.inspect({ info, env })}`)
    utils.debug.here(
        `[Koa Server][${info.name}][${info.version}]: Listen Address: ${ip.address()}:${
            env.port
        } at ${new Date()}`
    )

    app.instance = server
    return app
}

module.exports = server
