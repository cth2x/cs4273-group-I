-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: missing-persons-db.cngqqsemssns.us-east-2.rds.amazonaws.com    Database: missing_persons
-- ------------------------------------------------------
-- Server version	8.0.40

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin@gmail.com','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `case_id` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `race` varchar(50) DEFAULT NULL,
  `height` varchar(20) DEFAULT NULL,
  `weight` varchar(20) DEFAULT NULL,
  `missing_date` date DEFAULT NULL,
  `missing_location` text,
  `circumstances` text,
  `contact_info` text,
  `eye_color` varchar(50) DEFAULT NULL,
  `hair_color` varchar(50) DEFAULT NULL,
  `classification` enum('Endangered','Juvenile','Catastrophe','Disability','Unknown') NOT NULL DEFAULT 'Unknown',
  PRIMARY KEY (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES ('MP137780','Chalktar Madhab','67 Years','Male','Asian','6\'1\"','190 lbs','2025-02-02','Oklahoma City, OK','Last seen walking around neighborhood','405-111-0111','Brown','Black','Endangered'),('MP137806','Walker Nevaeh','24 Years','Female','Black / African American','5\'5\"','120 lbs','2025-02-02','Norman, OK','Last seen at school','405-222-3344','Blue','Blonde','Unknown'),('MP137807','Marshall Sozo','17 Years','Female','Black / African American','5\'6\"','125 lbs','2025-02-02','Tulsa, OK','Last seen at local park','405-333-4455','Green','Brown','Juvenile'),('MP137893','Suleiman Zaid','13 Years','Male','Multiple','5\'9\"','135 lbs','2025-02-03','Edmond, OK','Last seen leaving home','405-444-5566','Hazel','Red','Juvenile'),('MP137904','Murphy Tanner','22 Years','Male','White / Caucasian','5\'7\"','150 lbs','2025-02-03','Broken Arrow, OK','Last seen walking home from work','405-555-6677','Brown','Black','Unknown'),('MP137905','Hotchkiss Caedan','30 Years','Male','Black / African American','6\'0\"','170 lbs','2025-02-03','Moore, OK','Last seen in front of a convenience store','405-888-9999','Blue','Blonde','Disability'),('MP137906','Hardnett Jadan','28 Years','Male','Black / African American','5\'8\"','160 lbs','2025-02-03','Lawton, OK','Last seen in a shopping mall','405-555-1010','Green','Brown','Catastrophe'),('MP137907','Nicholas Aubrie','15 Years','Female','Black / African American','5\'10\"','140 lbs','2025-02-03','Ardmore, OK','Last seen at a local diner','405-555-2020','Brown','Black','Juvenile'),('MP137909','Gonzalez Orlando','16 Years','Male','White / Caucasian','5\'6\"','130 lbs','2025-02-03','Stillwater, OK','Last seen in a bus stop','405-555-3030','Hazel','Red','Juvenile'),('MP137961','Clemons Amaar','12 Years','Male','Black / African American','6\'2\"','200 lbs','2025-02-04','Tulsa, OK','Last seen in front of a school','405-555-4040','Green','Blonde','Juvenile'),('MP137975','Nunerley Kaelyn','15 Years','Female','Black / African American','5\'4\"','110 lbs','2025-02-04','Owasso, OK','Last seen at a friend\'s house','405-555-5050','Blue','Brown','Juvenile'),('MP138015','Watson Ielzea','12 Years','Female','Black / African American','5\'9\"','145 lbs','2025-02-05','Del City, OK','Last seen riding a bike','405-555-6060','Hazel','Black','Juvenile'),('MP138026','Shedrick Kaiden','40 Years','Female','Black / African American','5\'7\"','120 lbs','2025-02-05','Shawnee, OK','Last seen walking in the park','405-555-7070','Brown','Blonde','Unknown'),('MP138043','Williams Christian','25 Years','Male','Black / African American','5\'8\"','155 lbs','2025-02-05','Moore, OK','Last seen at a bus stop','405-555-8080','Blue','Red','Catastrophe'),('MP138050','Smith Chloe','23 Years','Female','White / Caucasian','6\'0\"','180 lbs','2025-02-05','Norman, OK','Last seen near a shopping mall','405-555-9090','Green','Black','Endangered'),('MP138110','Bruce Easton','22 Years','Male','White / Caucasian','5\'10\"','175 lbs','2025-02-06','Edmond, OK','Last seen walking in the neighborhood','405-555-1010','Hazel','Brown','Unknown'),('MP138111','Holmes Jazmine','55 Years','Female','Black / African American','5\'9\"','160 lbs','2025-02-06','Lawton, OK','Last seen in front of a grocery store','405-555-2121','Brown','Blonde','Disability'),('MP138119','Farro Ariel','15 Years','Female','White / Caucasian','5\'7\"','140 lbs','2025-02-06','Tulsa, OK','Last seen at a bus stop','405-555-3232','Green','Black','Juvenile'),('MP138120','Hammock Jayden','16 Years','Male','White / Caucasian','6\'1\"','190 lbs','2025-02-06','Oklahoma City, OK','Last seen walking around neighborhood','405-111-0111','Blue','Red','Juvenile'),('MP138124','Goodheart Laurie','61 Years','Female','White / Caucasian','5\'6\"','125 lbs','2025-02-06','Bethany, OK','Last seen in a park','405-555-4343','Hazel','Blonde','Unknown'),('MP138127','Sulkala Andrew','60 Years','Male','White / Caucasian','5\'11\"','180 lbs','2025-02-05','Enid, OK','Last seen at a local mall','405-555-5454','Green','Black','Catastrophe'),('MP138181','Ross Pamela','23 Years','Female','White / Caucasian','5\'5\"','115 lbs','2025-02-07','Muskogee, OK','Last seen leaving work','405-555-6565','Blue','Brown','Disability'),('MP138184','Monegro Coronado Luisueris','65 Years','Male','Hispanic / Latino','6\'0\"','185 lbs','2025-02-03','Stillwater, OK','Last seen near a bus station','405-555-7676','Brown','Blonde','Unknown'),('MP138187','Rodriguez Julianah','14 Years','Female','Multiple','5\'8\"','150 lbs','2025-02-07','Oklahoma City, OK','Last seen at a local park','405-555-8787','Green','Red','Juvenile'),('MP138194','De Leon Melissa','36 Years','Female','White / Caucasian','5\'6\"','140 lbs','2025-02-04','Tulsa, OK','Last seen walking in a neighborhood','405-555-9898','Brown','Black','Unknown');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_tribe`
--

DROP TABLE IF EXISTS `person_tribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_tribe` (
  `case_id` varchar(10) NOT NULL,
  `tribe_id` int NOT NULL,
  `tribe_status` enum('Enrolled','Affiliated') NOT NULL,
  PRIMARY KEY (`case_id`,`tribe_id`),
  KEY `tribe_id` (`tribe_id`),
  CONSTRAINT `person_tribe_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `person` (`case_id`) ON DELETE CASCADE,
  CONSTRAINT `person_tribe_ibfk_2` FOREIGN KEY (`tribe_id`) REFERENCES `tribe` (`tribe_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_tribe`
--

LOCK TABLES `person_tribe` WRITE;
/*!40000 ALTER TABLE `person_tribe` DISABLE KEYS */;
INSERT INTO `person_tribe` VALUES ('MP137780',1,'Enrolled'),('MP137780',2,'Affiliated'),('MP137807',3,'Enrolled'),('MP137893',4,'Affiliated'),('MP137904',5,'Enrolled'),('MP137905',6,'Affiliated'),('MP137906',1,'Enrolled'),('MP137907',2,'Affiliated'),('MP137909',3,'Enrolled'),('MP137961',4,'Affiliated'),('MP137975',5,'Enrolled'),('MP138015',6,'Affiliated'),('MP138026',1,'Enrolled'),('MP138043',2,'Affiliated'),('MP138050',3,'Enrolled'),('MP138110',4,'Affiliated'),('MP138111',5,'Enrolled'),('MP138119',6,'Affiliated'),('MP138120',1,'Enrolled'),('MP138124',2,'Affiliated'),('MP138127',3,'Enrolled'),('MP138181',4,'Affiliated'),('MP138184',5,'Enrolled'),('MP138187',6,'Affiliated'),('MP138194',1,'Enrolled');
/*!40000 ALTER TABLE `person_tribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tribe`
--

DROP TABLE IF EXISTS `tribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tribe` (
  `tribe_id` int NOT NULL AUTO_INCREMENT,
  `tribe_name` varchar(100) NOT NULL,
  PRIMARY KEY (`tribe_id`),
  UNIQUE KEY `tribe_name` (`tribe_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tribe`
--

LOCK TABLES `tribe` WRITE;
/*!40000 ALTER TABLE `tribe` DISABLE KEYS */;
INSERT INTO `tribe` VALUES (1,'Cherokee Nation'),(2,'Chickasaw Nation'),(3,'Choctaw Nation'),(6,'Comanche Nation'),(4,'Muscogee Nation'),(5,'Seminole Nation');
/*!40000 ALTER TABLE `tribe` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-30 10:41:40
