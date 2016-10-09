CREATE DATABASE chat;

USE chat;

-- DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `username` VARCHAR(100) NULL DEFAULT NULL,
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`username`)
);

-- DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `messages` VARCHAR(500) NULL DEFAULT NULL,
  `id_users` INTEGER NULL DEFAULT NULL,
  `id_rooms` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`roomname`)
);

ALTER TABLE `messages` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (id_rooms) REFERENCES `rooms` (`id`);
-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`username`,`id`) VALUES
-- ('','');
-- INSERT INTO `Messages` (`id`,`created_at`,`messages`,`id_users`,`id_rooms`) VALUES
-- ('','','','','');
-- INSERT INTO `room` (`id`,`roomname`) VALUES
-- ('','');