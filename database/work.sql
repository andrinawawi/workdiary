-- MySQL dump 10.13  Distrib 5.7.19, for macos10.12 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (3,'Yei',385,'2017-12-21 09:00:33','2017-12-21 09:21:18');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2017_12_14_115419_create_roles_table',1),(4,'2017_12_14_115729_create_role_user_table',1),(5,'2017_12_18_093827_create_projects_table',2),(6,'2017_12_18_095523_create_project_user_table',2),(7,'2017_12_20_175639_create_items_table',3),(8,'2017_12_27_161516_create_tasks_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_user`
--

DROP TABLE IF EXISTS `project_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_user_user_id_foreign` (`user_id`),
  KEY `project_user_project_id_foreign` (`project_id`),
  CONSTRAINT `project_user_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_user`
--

LOCK TABLES `project_user` WRITE;
/*!40000 ALTER TABLE `project_user` DISABLE KEYS */;
INSERT INTO `project_user` VALUES (5,1,3,'2017-12-26 12:42:25','2017-12-26 12:42:25'),(9,2,3,'2017-12-27 06:34:17','2017-12-27 06:34:17'),(13,4,3,'2017-12-27 06:46:48','2017-12-27 06:46:48'),(14,4,5,'2017-12-27 06:46:48','2017-12-27 06:46:48'),(15,6,6,'2017-12-28 07:24:41','2017-12-28 07:24:41'),(16,5,6,'2017-12-28 07:24:58','2017-12-28 07:24:58'),(17,5,1,'2017-12-28 07:24:58','2017-12-28 07:24:58'),(19,7,6,'2017-12-29 05:33:30','2017-12-29 05:33:30'),(20,7,1,'2017-12-29 05:33:30','2017-12-29 05:33:30'),(23,6,1,'2018-01-02 10:30:07','2018-01-02 10:30:07'),(25,5,7,'2018-01-03 06:12:26','2018-01-03 06:12:26');
/*!40000 ALTER TABLE `project_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `owner_user_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_owner_users_fk` (`owner_user_id`),
  CONSTRAINT `projects_owner_users_fk` FOREIGN KEY (`owner_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Project 1','This is 1st Project',3,'2017-12-18 11:47:06','2017-12-27 07:21:01'),(2,'Project 2','This is 2nd Project',3,'2017-12-18 11:48:14','2017-12-27 07:21:53'),(4,'Project 3','This is 3rd Project',3,'2017-12-21 10:08:32','2017-12-27 07:22:06'),(5,'Project 4','This is 4th Projectds',1,'2017-12-27 06:23:29','2018-01-02 09:42:43'),(6,'Project 6','One more projctsdiooiiooxs',1,'2017-12-27 11:30:47','2018-01-02 09:54:20'),(7,'Project 8','This is sample Project',1,'2017-12-29 05:33:20','2017-12-29 05:33:20');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,2,1,NULL,NULL),(2,1,3,NULL,NULL),(3,1,5,NULL,NULL),(4,1,6,NULL,NULL),(5,1,7,NULL,NULL),(6,1,8,NULL,NULL),(7,1,9,NULL,NULL),(8,1,10,NULL,NULL),(9,1,11,NULL,NULL),(10,1,12,NULL,NULL);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user','Normal User','2017-12-14 07:03:27','2017-12-14 07:03:27'),(2,'admin','Admin user','2017-12-14 07:03:27','2017-12-14 07:03:27');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('ToDo','Working','Done') COLLATE utf8_unicode_ci NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `assigned_user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tasks_assigned_user_id_foreign` (`assigned_user_id`),
  KEY `tasks_project_id_foreign` (`project_id`),
  CONSTRAINT `tasks_assigned_user_id_foreign` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'weTow',NULL,'ToDo',5,1,'2017-12-27 12:29:32','2017-12-27 12:29:32'),(3,'One Task3',NULL,'Done',5,1,'2017-12-28 07:45:58','2017-12-28 10:29:04'),(6,'9 Task 8','2018-01-17','Done',5,7,'2017-12-28 10:14:06','2017-12-28 10:18:10'),(9,'Tiel','2017-12-28','ToDo',5,7,'2017-12-28 11:59:30','2018-01-03 06:34:06'),(10,'1st Task','2017-12-30','ToDo',7,6,'2017-12-29 05:33:57','2017-12-29 05:33:57'),(11,'2bd Taks','2018-01-03','ToDo',7,1,'2018-01-03 06:37:33','2018-01-03 06:37:33'),(12,'Welcome','2018-01-03','ToDo',7,1,'2018-01-03 06:37:56','2018-01-03 06:37:56'),(13,'Once again','2018-01-03','ToDo',6,1,'2018-01-03 06:38:11','2018-01-03 06:38:11');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `owner_user_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@example.com','$2y$10$EvcWvAjx4oWT1nVxBWAC6eb/ng1YTUJyQGhF41PTe8yBtkYGM90ka','8XohFfELytFkLwrTsNvE1cGjioTKRW3lyQwSvd2fslTMBXcCvRIUQTbUTVYn',NULL,'2017-12-14 07:03:27','2017-12-14 07:03:27'),(2,'p','piyuesh@gmail.com','$2y$10$wwNRdyFU1mMM3pEc92aypexvDakqTd4PrwxzgAdVdWJOyJRVLOMxK','yBhERH9RKMNzCvFZ8cMGkRL7pztJTWgyqIJ2Atgg2r6BhyMykO2hLjDkqfOl',NULL,'2017-12-14 07:11:37','2017-12-14 07:11:37'),(3,'p','piyuesh+1@gmail.com','$2y$10$VpmhI1PQ1U1TgoFkbMcPGuN6ONu8TXtnWnIDM2PCGxknvnsW90Ezi','0bzq5Lh6ZoMJrBgivu90nJ6gFA2i2qfzIcJZiql2JDDrKNpCh90AaKjIwAvY',NULL,'2017-12-14 07:12:34','2017-12-14 07:12:34'),(4,'p','pm@iid.com','$2y$10$cCbNLgVt48NaBszY19G.cetn8uHshbCs4.vjapO.8BPlqFmuauPO.',NULL,3,'2017-12-21 11:44:14','2017-12-21 11:44:14'),(5,'User 88','pm@ii.com','$2y$10$ZjglcdYADrjvLhXvvQtREuePH14u9YWr0sy4KbRpad0d8JZZ61ERC',NULL,3,'2017-12-21 11:45:15','2017-12-27 10:36:03'),(6,'User 1','abc@example.com','$2y$10$PlyjmLxiw8IAZH1Ryru5KuoY6pAXL.3ff2T.tbkkLYnUEUMqnl0f2',NULL,1,'2017-12-27 07:44:47','2017-12-27 07:44:47'),(7,'PP','pm@work.com','$2y$10$/2K87DLd3005P22YKI2ufuXq0Aa2KdHwyavsw/rx6tdZgto7uvKYK',NULL,1,'2017-12-27 09:36:58','2017-12-27 09:36:58'),(8,'Yo China','yoyo@work.com','$2y$10$Y9cV8FZb1YzIX79JeVvlZutqL7VhzZixq0qMbz33lXW9bEa174T6q',NULL,1,'2017-12-27 09:42:55','2017-12-27 09:42:55'),(10,'The','the@work.com','$2y$10$Dz.m0Itr2aHKTQeEJnbQiu/eGGZNfEKtwaXstonRzYVi6wRoeC53q',NULL,3,'2017-12-27 09:50:58','2017-12-27 09:50:58'),(11,'Ram','ram@work.com','$2y$10$1uYdbvGtd4tKKgcO31g.qezEuW7nRNQMTu/seWTklFHGpJgnhPpqi',NULL,3,'2017-12-27 09:53:02','2017-12-27 09:53:02'),(12,'Fog','fog@work.com','$2y$10$GyOgsgyvdoI.yl9SlaihvOFm6hCVv0gcZTYcSK0njO0LHDqW0wnN.',NULL,3,'2017-12-27 09:55:19','2017-12-27 09:55:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-03 12:34:55
