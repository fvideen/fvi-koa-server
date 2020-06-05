'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')

const { toConfig } = require('i-node-utils/app/objects')

const app = require('../app')

chai.use(chaiHttp)
chai.should()

const SERVER_NAME = 'test-server'

describe(':: Koa Server', () => {
    describe('/support', () => {
        let server

        before(() =>
            app(toConfig({ server: { name: SERVER_NAME, version: '1.0.0' } }))
                .then(s => {
                    server = s
                })
                .catch(e => {
                    throw e
                })
        )
        after(() => server.instance.close())

        it('Koa Server with Invalid Config:', done => {
            const app = require('../app/index')
            app({})
                .then(() => {
                    done('Not throws Invalid Config Error')
                })
                .catch(e => {
                    chai.should().equal(
                        e.name,
                        'InvalidConfigError',
                        'Error not Invalid Config Error!'
                    )
                    done()
                })
        })

        it('Koa Server with Config into ./config directory:', done => {
            const app = require('../app/index')
            app()
                .then(server => {
                    chai.assert.exists(server, 'server is null!')
                    chai.assert.exists(server.instance, 'server.instance is null!')
                    chai.assert.exists(server.instance.close, 'server.instance.close is null!')
                    chai.assert.exists(server.info, 'server.info is null!')
                    chai.assert.exists(server.env, 'server.env is null!')

                    chai.assert.exists(server.info.name, 'server.info.name is null!')
                    chai.assert.exists(server.info.version, 'server.info.version is null!')

                    chai.assert.equal(
                        'unknown-http-server',
                        server.info.name,
                        'server.info.name is invalid!'
                    )
                    chai.assert.equal(
                        'test',
                        server.info.version,
                        'server.info.version is invalid!'
                    )

                    server.instance.close()
                    done()
                })
                .catch(e => {
                    done(e)
                })
        })

        it('/health', done => {
            chai.request(server.instance)
                .get('/support/health')
                .end((err, res) => {
                    if (err) done(err)

                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('server')
                    res.body.should.have.property('process')

                    chai.assert.exists(res.body.server.name, 'server.name is null!')
                    chai.assert.exists(res.body.server.version, 'server.version is null!')

                    chai.assert.exists(res.body.process.pid, 'process.pid is null!')
                    chai.assert.exists(res.body.process.version, 'process.version is null!')
                    chai.assert.exists(res.body.process.env, 'process.env is null!')
                    chai.assert.exists(res.body.process.memory, 'process.memory is null!')

                    chai.assert.equal(SERVER_NAME, res.body.server.name, 'server.name is invalid!')

                    chai.assert.equal(
                        '1.0.0',
                        res.body.server.version,
                        'server.version is invalid!'
                    )

                    done()
                })
        })
        it('/ping', done => {
            chai.request(server.instance)
                .get('/support/ping')
                .end((err, res) => {
                    if (err) done(err)
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('result').eql('pong')
                    done()
                })
        })
        it('/echo/test', done => {
            chai.request(server.instance)
                .get('/support/echo/test')
                .end((err, res) => {
                    if (err) done(err)
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('result').eql('test')
                    done()
                })
        })
    })
})
