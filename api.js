const Koa = require('koa')
const koaBody = require('koa-body')
const staticServer = require('koa-static')
const router = require('koa-router')()
const cors = require('@koa/cors')
const jwt = require('koa-jwt')

const { jwtSecret } = require('./etc/settings')

const {
  members, activities, users, attachments, vip, tradeLogs,
} = require('./routes')

const app = new Koa()
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = '无权访问'
    } else {
      throw err
    }
  })
})
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 4 * 1024 * 1024,
    uploadDir: `${__dirname}/webroot/upload`,
    keepExtensions: true,
  },
}))
app.use(staticServer(`${__dirname}/webroot`))
app.use(cors({ credentials: true }))

app.use(async (ctx, next) => {
  if (ctx.url.match(/^\/api\/users\/login/)) {
    await users.login(ctx, next)
  } else {
    return next()
  }
})
app.use(jwt({ secret: jwtSecret }))
app.use(users.init)

router.get('/api/users', users.search)
router.post('/api/users', users.save)

router.post('/api/attachments/upload', attachments.upload)

router.get('/api/currentUser', users.currentUser)

app.use(router.routes())
app.listen(8888)