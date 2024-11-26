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
-- Table structure for table `opportunitydetails`
--

DROP TABLE IF EXISTS `opportunitydetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opportunitydetails` (
  `id` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dealsOwner` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `dealsName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `amount` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `probability` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `accountName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `contactName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `stage` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `leadSource` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `nextStep` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `expectedRevenue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `currency` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `exchangeRate` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `closingDate` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdDate` date DEFAULT NULL,
  `ee_en_nn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dealValue` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `financialQtr` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `plannedRevenue` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `closurePeriod` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aging` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opportunitydetails`
--

LOCK TABLES `opportunitydetails` WRITE;
/*!40000 ALTER TABLE `opportunitydetails` DISABLE KEYS */;
INSERT INTO `opportunitydetails` VALUES ('10000','John Smith','DevOps Automation Testing','80000','45','Global Solution Ltd.','Verma','L6','New',' Webinar','Follow Up Meeting','50000','USD','1','2024-11-15','2024-07-25','NN','50000','Q2','50000','20',1),('123450','Amit','Website Redesign','200000','35','xyz Private Limited ','Raja','L4','Existing','Internet','Finalize contract','50000','USD','1','2024-09-07','2024-12-05','EN','50000','Q4','90000','40',2),('123456','Raju','Cloud Infrastructure Upgrade','30000','50','Innovations Pvt. Ltd.','Mani','L5','Existing','Referral','Schedule demo call','90000','USD','1','2024-10-27','2024-08-08','EE','30000','Q1','20000','56',2),('123457','kali','Product Upgrade 1','90000','70','Tech Solutions Pvt. Ltd.','Raju','L3','New','Internet','Schedule a meeting','90000','USD','1','2024-10-07','2024-09-22','EN','90000','Q4','90000','40',5);
/*!40000 ALTER TABLE `opportunitydetails` ENABLE KEYS */;
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
