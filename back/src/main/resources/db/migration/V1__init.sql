
CREATE DATABASE IF NOT EXISTS `streams`;


USE `streams`;

CREATE TABLE `problems` (
    `id`                varchar(255) NOT NULL,
    `title`             varchar(255) NOT NULL,
    `description`       LONGTEXT NOT NULL,
    `difficulty`        varchar(50) NOT NULL,
    `template`          LONGTEXT NOT NULL,
    `accepted`          INT DEFAULT 0,
    `submitted`         INT DEFAULT 0,
    `hint`              VARCHAR(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE `problem_examples` (
    `id`                varchar(255) NOT NULL,
    `test_input`        LONGTEXT NOT NULL,
    `test_output`       LONGTEXT NOT NULL,
    `explanation`       LONGTEXT ,
    `problem_id`        varchar(255),  -- Foreign key referencing `problems` table

    PRIMARY KEY (`id`),
    FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `submissions` (
    `id`                varchar(255) NOT NULL,
    `user_id`           varchar(255) NOT NULL,
    `problem_id`        varchar(255) NOT NULL,
    `solution`              LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
    `id`   varchar(255) PRIMARY KEY,
    `name` varchar(50) NOT NULL UNIQUE
);

CREATE TABLE `users` (
    `id`            varchar(255) PRIMARY KEY,
    `username`      varchar(50),
    `email`         varchar(50) NOT NULL UNIQUE,
    `password`      varchar(255) NOT NULL
);

CREATE TABLE `user_roles` (
    `user_id` varchar(255),
    `role_id` varchar(255),
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
);

