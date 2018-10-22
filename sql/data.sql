# ************************************************************
# Sequel Pro SQL dump
# Version 5224
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 8.0.11)
# Database: his_gateway
# Generation Time: 2018-09-26 02:21:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table apps
# ------------------------------------------------------------

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;

INSERT INTO `apps` (`id`, `name`, `api`, `strategy`, `created`, `groupLabel`, `isGroupMaster`)
VALUES
	(1,'平安宝','http://118.191.0.2:8057/v8/huinews','transparent','2018-09-17 12:01:34','his',1),
	(2,'社区版','http://118.191.0.2:8060/v4/huinews','transparent','2018-09-17 12:01:34','his',0);

/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table deviceRelations
# ------------------------------------------------------------

LOCK TABLES `deviceRelations` WRITE;
/*!40000 ALTER TABLE `deviceRelations` DISABLE KEYS */;

INSERT INTO `deviceRelations` (`id`, `did`, `appId`, `created`)
VALUES
	(1,'885D904016CF',1,'2018-09-17 15:35:12'),
	(2,'885D904016CF',2,'2018-09-17 17:32:30');

/*!40000 ALTER TABLE `deviceRelations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table devices
# ------------------------------------------------------------

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;

INSERT INTO `devices` (`id`, `catalog`, `model`, `did`, `manufacture`, `network`, `created`)
VALUES
	(1,'一体机','SC001','885D904016CF','武汉思创','wifi','2018-09-17 15:34:45');

/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
