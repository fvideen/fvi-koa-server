const Router = require('koa-router')

const URI = '/support'

module.exports = server => {
    const router = new Router({
        prefix: URI,
    })

    router.get('/health', async (ctx, _next) => {
        ctx.body = {
            server: server.info,
            process: {
                pid: process.pid,
                version: process.version,
                env: process.env.NODE_ENV,
                memory: process.memoryUsage(),
            },
        }
    })

    router.get('/ping', (ctx, _next) => {
        ctx.body = { result: 'pong' }
    })

    router.get('/echo/:echo', (ctx, _next) => {
        ctx.body = { result: ctx.params.echo }
    })

    server.use(router.routes()).use(router.allowedMethods())

    return router
}
