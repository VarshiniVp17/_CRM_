-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: combined_database1
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exceldatas`
--

DROP TABLE IF EXISTS `exceldatas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exceldatas` (
  `ï»¿NO` int DEFAULT NULL,
  `Deal ID No` int DEFAULT NULL,
  `Deal Value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Probability%` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exceldatas`
--

LOCK TABLES `exceldatas` WRITE;
/*!40000 ALTER TABLE `exceldatas` DISABLE KEYS */;
INSERT INTO `exceldatas` VALUES (1,25001046,'$ 16,107.38','80%'),(2,25001045,'$ 15,100.67','80%'),(3,25001044,'$ 17,114.09','80%'),(4,25001043,'$ 14,093.96','80%'),(5,25001042,'$ 6,711.41','20%'),(53,2500918,'$ 4,697.99','10%'),(71,2500866,'$ 8,724.83','10%'),(164,25000580,'$ 14,765.10','10%'),(105,25000770,'$ 20,134.23','10%'),(161,25000584,'$ 6,711.41','10%'),(248,250002,'$ 1,28,571.43','10%'),(19,25001010,'$ 12,080.54','10%'),(26,2500995,'$ 15,771.81','10%'),(44,2500944,'$ 20,134.23','10%'),(70,2500867,'$ 6,040.27','10%'),(16,25001019,'$ 67,114.09','50%'),(17,25001019,'$ 67,114.09','50%'),(78,25000821,'$ 8,053.69','10%'),(61,2500882,'$ 5,704.70','10%'),(165,25000526,'$ 20,134.23','10%'),(247,250006,'$ 6,428.57','10%'),(22,25001007,'$ 13,422.82','60%'),(23,25001006,'$ 13,422.82','60%'),(47,2500936,'$ 4,026.85','10%'),(25,2500996,'$ 6,711.41','80%'),(51,2500920,'$ 14,765.10','10%'),(27,2500994,'$ 15,100.67','30%'),(66,2500871,'$ 8,053.69','10%'),(29,2500992,'$ 16,778.52','20%'),(30,2500991,'$ 21,812.08','20%'),(31,2500990,'$ 18,456.38','20%'),(133,25000725,'$ 11,409.40','10%'),(33,2500988,'$ 20,134.23','60%'),(173,25000469,'$ 20,134.23','10%'),(191,25000139,'$ 32,214.77','90%'),(36,2500967,'$ 24,161.07','30%'),(95,25000775,'$ 6,711.41','90%'),(96,25000774,'$ 2,335.57','90%'),(153,25000667,'$ 22,147.65','90%'),(40,2500959,'$ 18,120.81','20%'),(41,2500958,'$ 17,449.66','20%'),(21,25001008,'$ 11,677.85','90%'),(43,2500941,'$ 16,107.38','50%'),(54,2500917,'$ 4,697.99','90%'),(45,2500943,'$ 16,107.38','50%'),(49,2500934,'$ 22,147.65','90%'),(50,2500933,'$ 22,147.65','90%'),(58,2500905,'$ 8,053.69','90%'),(59,2500904,'$ 6,711.41','90%'),(34,2500987,'$ 18,120.81','90%'),(46,2500937,'$ 4,026.85','90%'),(52,2500919,'$ 4,697.99','20%'),(57,2500906,'$ 6,040.27','90%'),(7,25001040,'$ 15,100.67','90%'),(104,25000762,'$ 13,422.82','90%'),(180,25000405,'$ 16,560.00','80%'),(10,25001028,'$ 11,073.83','70%'),(11,25001027,'$ 12,080.54','70%'),(12,25001026,'$ 12,080.54','70%'),(32,2500989,'$ 21,812.08','70%'),(39,2500964,'$ 24,161.07','70%'),(62,2500881,'$ 6,040.27','50%'),(42,2500957,'$ 26,174.50','70%'),(6,25001041,'$ 15,100.67','50%'),(8,25001030,'$ 18,120.81','50%'),(9,25001029,'$ 17,449.66','50%'),(67,2500870,'$ 5,033.56','60%'),(68,2500869,'$ 5,033.56','20%'),(69,2500868,'$ 8,724.83','60%'),(18,25001018,'$ 14,093.96','50%'),(38,2500965,'$ 12,080.54','50%'),(60,2500903,'$ 8,724.83','50%'),(64,2500879,'$ 10,067.11','50%'),(65,2500878,'$ 10,067.11','50%'),(72,2500865,'$ 9,395.97','50%'),(73,2500864,'$ 10,738.26','50%'),(77,25000822,'$ 8,053.69','50%'),(74,2500843,'$ 10,067.11','50%'),(75,2500842,'$ 10,067.11','50%'),(134,25000724,'$ 13,422.82','50%'),(146,25000677,'$ 16,107.38','50%'),(149,25000671,'$ 17,114.09','50%'),(83,25000816,'$ 1,91,946.31','50%'),(84,25000816,'$ 1,91,946.31','50%'),(85,25000816,'$ 1,91,946.31','50%'),(86,25000808,'$ 27,181.21','80%'),(87,25000807,'$ 20,134.23','60%'),(88,25000806,'$ 10,067.11','20%'),(150,25000670,'$ 28,187.92','50%'),(151,25000669,'$ 20,134.23','50%'),(91,25000788,'$ 11,409.40','30%'),(156,25000605,'$ 20,134.23','50%'),(214,2500035,'$ 4,832.21','50%'),(94,25000776,'$ 2,642.62','20%'),(215,2500035,'$ 4,832.21','50%'),(216,2500035,'$ 4,832.21','50%'),(217,2500035,'$ 4,832.21','50%'),(218,2500035,'$ 4,832.21','50%'),(99,25000767,'$ 13,422.82','30%'),(100,25000766,'$ 12,080.54','60%'),(101,25000765,'$ 13,422.82','30%'),(219,2500035,'$ 4,832.21','50%'),(103,25000763,'$ 11,409.40','20%'),(230,2500027,'$ 40,268.46','50%'),(232,2500025,'$ 24,161.07','50%'),(106,25000769,'$ 20,134.23','60%'),(107,25000768,'$ 33,557.05','20%'),(108,25000749,'$ 31,828.19','40%'),(109,25000749,'$ 31,828.19','40%'),(110,25000748,'$ 32,536.91','40%'),(111,25000748,'$ 32,536.91','40%'),(112,25000747,'$ 32,536.91','40%'),(113,25000747,'$ 32,536.91','40%'),(114,25000746,'$ 2,12,607.38','40%'),(115,25000745,'$ 2,12,607.38','40%'),(116,25000744,'$ 2,12,607.38','40%'),(117,25000743,'$ 90,604.03','50%'),(118,25000742,'$ 45,805.37','80%'),(119,25000741,'$ 87,583.89','80%'),(120,25000740,'$ 87,583.89','80%'),(121,25000739,'$ 35,234.90','60%'),(122,25000738,'$ 33,503.36','80%'),(123,25000737,'$ 33,503.36','80%'),(124,25000736,'$ 33,503.36','80%'),(125,25000735,'$ 26,677.85','80%'),(126,25000734,'$ 26,677.85','80%'),(127,25000733,'$ 26,677.85','80%'),(128,25000732,'$ 52,348.99','80%'),(129,25000731,'$ 52,348.99','80%'),(130,25000730,'$ 52,348.99','80%'),(89,25000805,'$ 20,134.23','30%'),(132,25000726,'$ 17,449.66','60%'),(90,25000804,'$ 21,476.51','30%'),(166,25000511,'$ 24,161.07','30%'),(135,25000715,'$ 13,422.82','40%'),(136,25000714,'$ 13,422.82','20%'),(137,25000711,'$ 20,134.23','80%'),(138,25000694,'$ 15,840.00','30%'),(139,25000694,'$ 15,840.00','30%'),(140,25000694,'$ 15,840.00','30%'),(141,25000694,'$ 15,840.00','30%'),(63,2500880,'$ 6,711.41','30%'),(143,25000680,'$ 12,080.54','60%'),(144,25000679,'$ 17,114.09','30%'),(145,25000678,'$ 12,080.54','50%'),(159,25000587,'','100%'),(147,25000674,'$ 87,248.32','50%'),(148,25000674,'$ 87,248.32','50%'),(160,25000587,'','100%'),(35,2500975,'$ 18,791.95','100%'),(37,2500966,'','100%'),(152,25000668,'$ 20,134.23','50%'),(142,25000681,'$ 16,107.38','25%'),(167,25000510,'$ 22,147.65','25%'),(155,25000606,'$ 16,107.38','40%'),(92,25000787,'$ 13,422.82','25%'),(13,25001025,'$ 14,093.96','25%'),(14,25001024,'$ 11,409.40','25%'),(15,25001023,'$ 12,416.11','25%'),(24,25001005,'$ 17,449.66','25%'),(48,2500935,'$ 4,026.85','25%'),(162,25000582,'$ 22,147.65','30%'),(163,25000581,'$ 17,114.09','60%'),(55,2500916,'$ 15,100.67','25%'),(56,2500915,'$ 4,697.99','25%'),(175,25000413,'$ 24,161.07','25%'),(176,25000412,'$ 28,187.92','25%'),(168,25000496,'','30%'),(169,25000495,'$ 9,060.40','20%'),(170,25000497,'$ 16,000.00','20%'),(171,25000470,'$ 33,557.05','20%'),(172,25000470,'$ 33,557.05','20%'),(79,25000817,'$ 1,20,805.37','75%'),(80,25000817,'$ 1,20,805.37','75%'),(81,25000817,'$ 1,20,805.37','75%'),(82,25000817,'$ 1,20,805.37','75%'),(177,25000408,'$ 16,107.38','50%'),(178,25000407,'$ 26,677.85','80%'),(179,25000407,'$ 26,677.85','80%'),(102,25000764,'$ 13,422.82','75%'),(181,25000389,'$ 5,704.70','40%'),(20,25001009,'$ 12,483.22','75%'),(28,2500993,'$ 15,570.47','75%'),(184,25000322,'$ 28,187.92','40%'),(76,25000823,'$ 18,120.81','75%'),(186,25000138,'$ 6,000.00','40%'),(187,25000137,'$ 6,000.00','40%'),(188,25000136,'$ 2,700.00','20%'),(189,25000134,'$ 45,302.01','40%'),(190,25000140,'$ 26,845.64','20%'),(93,25000786,'$ 11,409.40','75%'),(192,25000135,'$ 6,711.41','80%'),(193,25000117,'$ 15,100.67','50%'),(194,25000116,'$ 48,322.15','50%'),(195,2500088,'$ 15,000.00','30%'),(196,2500086,'$ 25,344.00','30%'),(197,2500086,'$ 25,344.00','30%'),(198,2500040,'$ 32,536.91','40%'),(199,2500040,'$ 32,536.91','40%'),(200,2500040,'$ 32,536.91','40%'),(201,2500039,'$ 31,828.19','40%'),(202,2500039,'$ 31,828.19','40%'),(203,2500039,'$ 31,828.19','40%'),(204,2500039,'$ 31,828.19','40%'),(205,2500038,'$ 18,523.49','80%'),(206,2500037,'$ 33,503.36','80%'),(207,2500037,'$ 33,503.36','80%'),(208,2500037,'$ 33,503.36','80%'),(209,2500036,'$ 35,234.90','60%'),(210,2500036,'$ 35,234.90','60%'),(211,2500036,'$ 35,234.90','60%'),(212,2500036,'$ 35,234.90','60%'),(213,2500036,'$ 35,234.90','60%'),(97,25000772,'$ 15,704.70','75%'),(98,25000772,'$ 15,704.70','75%'),(131,25000727,'$ 10,067.11','75%'),(154,25000607,'$ 13,087.25','75%'),(157,25000604,'$ 15,704.70','75%'),(158,25000604,'$ 15,704.70','75%'),(220,2500034,'$ 64,328.00','40%'),(221,2500031,'$ 87,583.89','80%'),(222,2500031,'$ 87,583.89','80%'),(223,2500031,'$ 87,583.89','80%'),(224,2500030,'$ 4,09,006.71','40%'),(225,2500030,'$ 4,09,006.71','40%'),(226,2500030,'$ 4,09,006.71','40%'),(227,2500030,'$ 4,09,006.71','40%'),(228,2500029,'$ 19,432.55','20%'),(229,2500029,'$ 19,432.55','20%'),(185,25000298,'$ 15,704.70','75%'),(231,2500026,'$ 23,489.93','20%'),(174,25000418,'$ 24,161.07','75%'),(233,2500024,'$ 50,335.57','50%'),(234,2500023,'$ 90,604.03','50%'),(235,2500023,'$ 90,604.03','50%'),(236,2500023,'$ 90,604.03','50%'),(237,2500023,'$ 90,604.03','50%'),(238,2500023,'$ 90,604.03','50%'),(239,2500015,'$ 59,357.14','50%'),(240,2500015,'$ 59,357.14','50%'),(241,2500014,'$ 55,714.29','80%'),(242,2500014,'$ 55,714.29','80%'),(243,2500014,'$ 55,714.29','80%'),(244,250009,'$ 20,714.29','30%'),(245,250008,'$ 51,428.57','30%'),(246,250007,'$ 38,571.43','30%'),(182,25000388,'$ 7,382.55','75%'),(183,25000387,'$ 12,080.54','75%'),(249,250001,'$ 17,142.86','60%');
/*!40000 ALTER TABLE `exceldatas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 14:54:05