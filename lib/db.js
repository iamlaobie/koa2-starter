import settings from '../etc/settings'
import mysql from 'hi-mysql'

export default mysql.createPool(settings.mysql)
