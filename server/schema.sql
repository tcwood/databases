CREATE DATABASE chat;

USE chat;

-- DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `username` VARCHAR(100) NULL DEFAULT NULL,
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `created-at` DATETIME(6) NULL DEFAULT NULL,
  `messages` VARCHAR(500) NULL DEFAULT NULL,
  `id_Users` INTEGER NULL DEFAULT NULL,
  `id_Room` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- DROP TABLE IF EXISTS `Room`;
    
CREATE TABLE `Room` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `Messages` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (id_Room) REFERENCES `Room` (`id`);

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`username`,`id`) VALUES
-- ('','');
-- INSERT INTO `Messages` (`id`,`created-at`,`messages`,`id_Users`,`id_Room`) VALUES
-- ('','','','','');
-- INSERT INTO `Room` (`id`,`roomname`) VALUES
-- ('','');