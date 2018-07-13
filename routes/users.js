const jwt = require('jsonwebtoken')
const random = require('randomatic')
const md5 = require('md5')
const { jwtSecret } = require('../etc/settings')
const dao = require('../db/users')


exports.currentUser = async (ctx) => {
  const { state: { user } } = ctx
  ctx.body = {
    name: user.realname,
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: user.id,
    notifyCount: 0,
  }
}

exports.init = async (ctx, next) => {
  const { state: { user: { id } } } = ctx
  const user = await dao.get(id)
  ctx.state.user = user
  return next()
}

exports.login = async ({ request, response }) => {
  const res = {
    result: false, msg: '用户名或密码错误', status: 'error', type: 'account', currentAuthority: 'guest',
  }
  const { userName: username, password } = request.body
  if (!username || !password) {
    response.body = res
    return
  }
  const user = await dao.getBy('username', username)
  if (!user.id) {
    response.body = res
    return
  }
  const dg = md5(`${password}${user.salt}`)
  console.log(dg, user.password)
  if (dg !== user.password) {
    response.body = res
    return
  }

  const token = jwt.sign({ id: user.id, t: Date.now() }, jwtSecret)
  response.body = {
    status: 'ok', currentAuthority: 'admin', type: 'account', token,
  }
}

exports.search = async ({ response }) => {
  const users = await dao.search()
  response.body = { users }
}

exports.save = async ({ request, response }) => {
  const {
    id, username, realname, role, password = '', mobile = '', memberId = '',
  } = request.body
  const d = {
    id, username, realname, role, mobile, memberId,
  }
  if (password) {
    d.salt = random('Aa0', 8)
    d.password = md5(`${password}${d.salt}`)
  }

  const newId = await dao.save(d)
  response.body = { id: newId }
}

exports.delete = async ({ request, response }) => {
  await dao.delete(request.body)
  response.body = { result: true }
}
