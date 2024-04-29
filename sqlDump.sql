CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
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
-- Table structure for table `dates`
--

DROP TABLE IF EXISTS `dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dates` (
  `Date_ID` int NOT NULL AUTO_INCREMENT,
  `calories` int DEFAULT NULL,
  `Date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Date_ID`),
  KEY `Date` (`Date`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dates`
--

LOCK TABLES `dates` WRITE;
/*!40000 ALTER TABLE `dates` DISABLE KEYS */;
INSERT INTO `dates` VALUES (2,0,'1'),(3,0,'2'),(4,0,'1'),(5,0,'1'),(6,0,'2'),(7,0,'1'),(8,0,'1/2/19'),(9,0,'1/12/22'),(10,0,'1/2/19'),(11,0,'1'),(12,50,'2024-04-23'),(13,50,'2024-04-23'),(14,50,'2024-04-23'),(15,50,'2024-04-23'),(16,50,'2024-04-23'),(17,50,'2024-04-23'),(18,50,'2024-04-23'),(19,50,'2024-04-23'),(20,50,'2024-04-23'),(21,50,'2024-04-27'),(22,50,'2024-04-01'),(23,50,'2024-04-10'),(24,50,'2024-04-10'),(25,50,'2024-04-10'),(26,50,'2024-04-10'),(27,50,'2024-04-10'),(28,50,'2024-04-10'),(29,50,'2024-04-10'),(30,50,'2024-04-10'),(31,50,'2024-04-10'),(32,50,'2024-04-10'),(33,50,'2024-04-20'),(34,50,'2024-04-20'),(35,50,'2024-04-20'),(36,50,'2024-04-20'),(37,50,'2024-04-27'),(38,50,'2024-04-27'),(39,50,'2024-04-27'),(40,50,'2024-04-27'),(41,50,'2024-04-27'),(42,50,'2024-04-27'),(43,50,'2024-04-27'),(44,50,'2024-04-27'),(45,50,'2024-04-27'),(46,0,'2024-04-10'),(47,0,'12/12/12'),(48,0,'12/12/11'),(49,0,'12/12/12'),(50,0,'12/12/12'),(51,0,'2024-04-27'),(52,0,'2024-04-26'),(53,0,'2024-04-25'),(54,0,'2024-04-25'),(55,0,'2024-04-24'),(56,1,'2024-04-26'),(57,1,'2024-04-26'),(58,1,'2024-04-26'),(59,1,'2024-04-26'),(60,1,'2024-04-26'),(61,1,'2024-04-26'),(62,1,'2024-04-26'),(63,1,'2024-04-26'),(64,100000,'2024-04-26'),(65,0,'2024-04-25'),(66,0,'2024-04-25'),(67,0,'2024-04-26'),(68,0,'2024-04-04'),(69,0,'2024-04-29'),(70,0,'2024-04-29'),(71,0,'2024-04-30'),(72,0,'2024-04-29'),(73,0,'2024-04-30'),(74,0,'2024-05-02'),(75,0,'2024-04-16'),(76,0,'2024-04-30'),(77,0,'2024-04-29'),(78,0,'2024-04-16'),(79,0,'2024-04-16'),(80,0,'2024-04-29'),(81,0,'2024-04-29'),(82,2000,'2024-05-04');
/*!40000 ALTER TABLE `dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workouts`
--

DROP TABLE IF EXISTS `workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Workout Name` varchar(45) NOT NULL,
  `Sets` int NOT NULL,
  `Reps` int NOT NULL,
  `Weight` int DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_workouts_date` (`date`),
  KEY `index_name` (`Workout Name`,`Sets`,`Reps`,`date`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workouts`
--

LOCK TABLES `workouts` WRITE;
/*!40000 ALTER TABLE `workouts` DISABLE KEYS */;
INSERT INTO `workouts` VALUES (50,'Pull ups ',3,3,3,'2024-04-16'),(52,'DumbBell Curls ',3,10,20,'2024-04-29'),(54,'Plank',3,3,0,'2024-04-16'),(56,'Chest Press ',5,5,4,'2024-04-29');
/*!40000 ALTER TABLE `workouts` ENABLE KEYS */;
UNLOCK TABLES;


CREATE DEFINER=`root`@`localhost` PROCEDURE `FilterWorkoutsByCategory`(
    IN category_name VARCHAR(50),
    IN category_value VARCHAR(50)
)
BEGIN
    DECLARE query_str VARCHAR(255);
    SET @query = '';

    IF category_name = 'Workout Name' THEN
        SET @query = CONCAT('SELECT * FROM workouts WHERE `Workout Name` = ''', category_value, '''');
    ELSE
        SET @query = CONCAT('SELECT * FROM workouts WHERE `', category_name, '` = ''', category_value, '''');
    END IF;

    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSortedWorkouts`(IN sortBy VARCHAR(50))
BEGIN
    IF sortBy = 'Reps' THEN
        SELECT * FROM workouts ORDER BY Reps;
    ELSEIF sortBy = 'Sets' THEN
        SELECT * FROM workouts ORDER BY Sets;
    ELSEIF sortBy = 'Weight' THEN
        SELECT * FROM workouts ORDER BY Weight;
    ELSE
        SELECT * FROM workouts ORDER BY `Workout Name`;
    END IF;
END

  CREATE INDEX index_name ON workouts (`Workout Name`, Sets, Reps, Weight);
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;





/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29 18:58:57
