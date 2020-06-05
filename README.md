# fvi-koa-server

-   `npm run compile`: Executa a limpeza dos arquivos e diretorios.
-   `npm run debug-test`: Executa os testes unitários com o DEBUG ativo.
-   `npm run test`: Executa os testes unitários.
-   `npm run debug-dev`: Executa os testes unitários e espera por alterações com o DEBUG ativo.
-   `npm run dev`: Executa os testes unitários e espera por alterçãoes.
-   `npm run prod`: Executa o código com NODE_ENV=production.
-   `npm run coverage`: Executa os testes unitários e retorna a cobertura dos códigos através do [nyc](https://github.com/istanbuljs/nyc/)
-   `npm run release`: Inicia uma nova release de versão incrementando o **patch**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:minor`: Inicia uma nova release de versão incrementando o **minor**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:major`: Inicia uma nova release de versão incrementando o **major**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:finish`: Finaliza a release, ou seja, realiza o [git flow](https://github.com/nvie/gitflow/) release finish.

## FVI - Koa Server

Biblioteca que implementa um servidor _http_ utilizando a biblioteca [koa](https://github.com/koajs/koa).

### Configuração

Esta biblioteca utiliza uma instância da biblioteca [node-convict.js](https://github.com/mozilla/node-convict), ou qualquer outra biblioteca que respeitar o contrato abaixo:

```javascript

config.get('prop1.prop2.prop3'): Object
config.has('prop1.prop2.prop3'): Boolean

```

> Exemplo de outra biblioteca que pode ser utilizada é [node-config.js](https://github.com/lorenwest/node-config)

Existe um contrato para as propriedades em um arquivo de configuração para o funcionamento correto deste módulo, devemos configurar as informações como o exemplo, _convict_, abaixo:

```json
{
    "server": {
        "name": {
            "doc": "Koa Server Name",
            "format": String,
            "default": "unknown-koa-server",
            "env": "KOA_SERVER_NAME",
            "arg": "koa-server-name"
        },
        "port": {
            "doc": "Koa Server Port",
            "format": "port",
            "default": 4000,
            "env": "KOA_SERVER_PORT",
            "arg": "koa-server-port"
        },
        "version": {
            "doc": "Koa Server Version",
            "format": String,
            "default": "1.0.0",
            "env": "KOA_SERVER_VERSION",
            "arg": "koa-server-version"
        }
    }
}
```

### Mode de Usar

Aqui iremos demonstrar a utilização da biblioteca utilizando outra biblioteca para criar as rotas do servidor a [koa-router](https://github.com/koajs/router)

```javascript
const app = require('fvi-koa-server')

const server = app(config)

const Router = require('koa-router')

const router = new Router()

router.get('/echo/:it', ctx => {
    ctx.body = ctx.params.it
})

router.get('/querystring', ctx => {
    ctx.body = ctx.query
})

router.post('/form', ctx => {
    ctx.body = ctx.request.body
})

server.use(router.routes()).use(router.allowedMethods())
```

### `server` Object

Este é um _Object_ que representa as informações da instância do **Koa** _Object_ com algumas informações a mais, como segue abaixo:

-   **server.env**: Informações das variáveis de ambiente que o servidor utiliza.
-   **server.info**: Informações gerais do servidor, como nome, porta, etc.

### `server.instance`

Este é um _Object_ que representa a instância do servidor, ou melhor, o mesmo que:

```javascript
const Koa = require('koa')
const server = new Koa()
const instance = server.listen(4000)

server.instance = instance
```

Portanto, podemos considerar o seguinte comando para terminar nosso servidor:

```javascript
server.instance.close()
```
