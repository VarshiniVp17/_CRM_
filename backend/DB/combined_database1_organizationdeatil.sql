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
-- Table structure for table `organizationdeatil`
--

DROP TABLE IF EXISTS `organizationdeatil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizationdeatil` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coreBusiness` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sector` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `industryType` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `turnover` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hqAddress` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hqCity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hqState` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hqCountry` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hqZipcode` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hqPhoneNumber` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `hqEmail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `centerAddress` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `centerCity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `centerState` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `centerCountry` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `centerZipcode` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `centerPhoneNumber` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `centerEmail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizationdeatil`
--

LOCK TABLES `organizationdeatil` WRITE;
/*!40000 ALTER TABLE `organizationdeatil` DISABLE KEYS */;
/*!40000 ALTER TABLE `organizationdeatil` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 14:54:04
