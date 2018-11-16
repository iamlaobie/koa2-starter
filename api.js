import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import { argv } from 'yargs'
import route from './routes/index'
import settings from './etc/settings'

const router = new Router()

const app = new Koa()
app.use(koaBody())

router.get('/', route.serve)
app.use(router.routes()).use(router.allowedMethods())

const port = argv.port || settings.port || 8888
app.listen(port)

// eslint-disable-next-line
console.log(`server start on port ${port} at ${(new Date().toISOString())}`)
