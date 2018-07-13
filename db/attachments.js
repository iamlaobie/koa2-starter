const db = require('../lib/db')

exports.save = (data) => db.executeInsert('insert into attachments set ?', [data])
