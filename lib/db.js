import mysql from 'hi-mysql';
import settings from '../etc/settings.json';

export default mysql.createPool(settings.mysql);
