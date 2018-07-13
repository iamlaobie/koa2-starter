const db = require('../lib/db')

exports.login = ({ username, password }) => db.queryObject('select * from admins where username = ? and password = ?', [username, password])
exports.get = id => db.queryObject('select * from admins where id = ?', [id])
exports.getBy = (field, value) => db.queryObject('select * from admins where ?? = ?', [field, value])
exports.search = () => db.query('select a.id, a.realname, a.username, a.mobile, a.role, a.memberId, b.name as bindName, b.telephone, b.headimgurl from admins as a left join members as b on a.memberId = b.id  where a.status = 0 order by a.created desc')
exports.save = async ({
  id = '', realname, username, mobile, password, salt, role, memberId,
}) => {
  const data = {
    realname, username, mobile, role,
  }
  if (password) {
    data.password = password
    data.salt = salt
  }
  if (memberId) data.memberId = memberId
  if (id) {
    await db.query('update admins set ? where id = ?', [data, id])
  } else {
    id = await db.executeInsert('insert into admins set ?', data)
  }
  return id
}

exports.delete = ({ id }) => db.query('update admins set status = 1 where id = ?', [id])
