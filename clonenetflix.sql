-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: clonenetflix
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Account` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `CardNumber` varchar(16) NOT NULL,
  `ExpirationDateMonthYear` varchar(8) NOT NULL,
  `SecurityCode` int(3) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
INSERT INTO `Account` VALUES (1,'Misael Villar Julian','5451787251125105','09/2027',681,'2022-12-12 17:38:53','2022-12-12 15:30:02','S');
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genders`
--

DROP TABLE IF EXISTS `Genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Genders` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Gender` varchar(50) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genders`
--

LOCK TABLES `Genders` WRITE;
/*!40000 ALTER TABLE `Genders` DISABLE KEYS */;
INSERT INTO `Genders` VALUES (1,'Acción','2022-12-04 16:32:24','2022-12-04 10:32:24','S'),(2,'Animes','2022-12-04 17:31:33','2022-12-04 11:31:33','S'),(3,'Británicos','2022-12-04 17:31:58','2022-12-04 11:31:58','S'),(4,'Ciencia y Naturaleza','2022-12-04 17:32:30','2022-12-04 11:32:30','S'),(5,'Comedias','2022-12-04 17:32:59','2022-12-04 11:32:59','S'),(6,'Contenido Infantil','2022-12-04 17:33:29','2022-12-04 11:33:29','S'),(7,'De Adolecentes','2022-12-04 17:33:53','2022-12-04 11:33:53','S'),(8,'De EE. UU.','2022-12-04 17:34:47','2022-12-04 11:34:47','S'),(9,'De México','2022-12-04 17:35:15','2022-12-04 11:35:15','S'),(10,'Dramas','2022-12-04 17:35:32','2022-12-04 11:35:32','S'),(11,'Especiales de Stand Up','2022-12-04 17:36:00','2022-12-04 11:36:00','S'),(12,'Latinoamericanos','2022-12-04 17:36:19','2022-12-04 11:36:19','S'),(13,'Navidad','2022-12-04 17:36:36','2022-12-04 11:36:36','S'),(14,'Crímenes','2022-12-04 17:50:40','2022-12-04 11:50:40','S'),(15,'Fantasía','2022-12-04 17:50:51','2022-12-04 11:50:51','S'),(16,'Cómics','2022-12-04 17:51:11','2022-12-04 11:51:11','S');
/*!40000 ALTER TABLE `Genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Movies`
--

DROP TABLE IF EXISTS `Movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Movies` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Year` int(5) NOT NULL,
  `Genders` varchar(100) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movies`
--

LOCK TABLES `Movies` WRITE;
/*!40000 ALTER TABLE `Movies` DISABLE KEYS */;
INSERT INTO `Movies` VALUES (1,'Transformers 1','En este megaéxito de acción, los habitantes del planeta Cybertron inician una guerra secreta por el control de los recursos naturales de la Tierra.',2007,'Cine de sci-fi, Acción y aventura','2022-12-10 20:51:38','2022-12-10 14:52:07','S');
/*!40000 ALTER TABLE `Movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profile`
--

DROP TABLE IF EXISTS `Profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profile` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `IDUsr` int(10) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `UnderAge` char(1) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDUsr` (`IDUsr`),
  CONSTRAINT `Profile_ibfk_1` FOREIGN KEY (`IDUsr`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profile`
--

LOCK TABLES `Profile` WRITE;
/*!40000 ALTER TABLE `Profile` DISABLE KEYS */;
INSERT INTO `Profile` VALUES (1,1,'misa1234','N','2022-12-04 00:30:15','2022-12-03 18:30:15','S');
/*!40000 ALTER TABLE `Profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Series`
--

DROP TABLE IF EXISTS `Series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Series` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Year` int(5) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Series`
--

LOCK TABLES `Series` WRITE;
/*!40000 ALTER TABLE `Series` DISABLE KEYS */;
INSERT INTO `Series` VALUES (3,'The Flash','En esta serie del clásico superhéroe, un especialista forense vuelve de un coma y descubre que posee poderes que le permitirán enfrentar a quienes amenacen a su ciudad.','Series de sci-fi, Series basadas en cómics, Series de EE. UU.',2014,'2022-12-13 05:56:31','2022-12-12 23:56:31','S');
/*!40000 ALTER TABLE `Series` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubLevel`
--

DROP TABLE IF EXISTS `SubLevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubLevel` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Level` varchar(30) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubLevel`
--

LOCK TABLES `SubLevel` WRITE;
/*!40000 ALTER TABLE `SubLevel` DISABLE KEYS */;
INSERT INTO `SubLevel` VALUES (1,'Básico con anuncios','2022-12-04 16:38:53','2022-12-04 10:38:53','S'),(2,'Estándar','2022-12-13 03:42:40','2022-12-12 21:42:40','S'),(3,'Premium','2022-12-13 03:42:40','2022-12-12 21:42:40','S');
/*!40000 ALTER TABLE `SubLevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subscriptions`
--

DROP TABLE IF EXISTS `Subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Subscriptions` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `IDLev` int(10) NOT NULL,
  `PriceMonth` int(10) NOT NULL,
  `VideoQuality` varchar(30) NOT NULL,
  `Resolution` varchar(20) NOT NULL,
  `MultiDevices` char(1) NOT NULL,
  `Downloads` char(1) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDLev` (`IDLev`),
  CONSTRAINT `Subscriptions_ibfk_1` FOREIGN KEY (`IDLev`) REFERENCES `SubLevel` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subscriptions`
--

LOCK TABLES `Subscriptions` WRITE;
/*!40000 ALTER TABLE `Subscriptions` DISABLE KEYS */;
INSERT INTO `Subscriptions` VALUES (1,1,99,'Buena','720p','S','N','2022-12-13 03:38:01','2022-12-12 21:48:01','S'),(2,2,219,'Mejor','1080p','S','S','2022-12-13 03:47:27','2022-12-12 21:48:06','S'),(3,3,299,'Óptima','4K+HDR','S','S','2022-12-13 03:47:27','2022-12-12 21:48:10','S');
/*!40000 ALTER TABLE `Subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `IDS` int(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Pass` varchar(70) NOT NULL,
  `Phone` bigint(10) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDS` (`IDS`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`IDS`) REFERENCES `Subscriptions` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,1,'l19350325@tuxtepec.tecnm.mx','GH1124&VJ',2871819827,'2022-12-03 22:35:18','2022-12-12 22:50:02','N'),(2,2,'l19350326@tuxtepec.tecnm.mx','GH1124&VJ',2876542356,'2022-12-13 04:04:25','2022-12-12 22:04:25','S'),(3,2,'l19350327@tuxtepec.tecnm.mx','GH1124&VJ',2876542356,'2022-12-13 04:05:12','2022-12-12 22:05:12','S'),(4,3,'l19350329@tuxtepec.tecnm.mx','$2a$10$kBLT1EqRJZhsCqVVuFaA8OuT6gTz5WNhxkMc.0G/hp0c3ref3yFne',2876542356,'2022-12-13 04:15:09','2022-12-12 22:15:09','S');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-13 22:42:43
