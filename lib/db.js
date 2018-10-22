import settings from '../etc/settings';
import mysql from './mysql';

export default mysql.createPool(settings.mysql);
