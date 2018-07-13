const path = require('path')
const uuidx = require('uuid')
const dao = require('../db/attachments')
const { base } = require('../etc/settings')

exports.upload = async ({ request, response }) => {
  const { fields: { biz = '', activityId = '' }, files: { file } } = request.body
  const p = file.path.replace(path.normalize(`${__dirname}/../webroot`), '')
  const id = uuidx.v4()
  await dao.save({
    id,
    biz,
    activityId,
    originFileName: file.name,
    mimeType: file.type,
    url: p,
  })
  response.body = {
    id, url: `${base}${p}`,
  }
}
