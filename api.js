import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import { argv } from 'yargs'
import adapters from './adapters'
import route from './routes/index'
import settings from './etc/settings'

const router = new Router()

const app = new Koa()
app.use(koaBody())

// 绑定适配器的输入和输出
adapters.bind(router, route.serve)
app.use(router.routes()).use(router.allowedMethods())

const port = argv.port || settings.port || 8888
app.listen(port)

// eslint-disable-next-line
console.log(`server start on port ${port} at ${(new Date().toISOString())}`)
