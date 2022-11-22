-- https://stackoverflow.com/questions/17990573/mysql-insert-into-with-foreach-like

-- DropForeignKey
ALTER TABLE `performers` DROP FOREIGN KEY `performers_avatar_id_fkey`;

-- DropForeignKey
ALTER TABLE `organizations` DROP FOREIGN KEY `organizations_avatar_id_fkey`;

-- DropIndex
DROP INDEX `performers_youtube_channel_id_key` ON `performers`;

-- DropIndex
DROP INDEX `performers_twitter_username_key` ON `performers`;

-- DropIndex
DROP INDEX `performers_youtube_channel_id_idx` ON `performers`;

-- DropIndex
DROP INDEX `performers_twitter_username_idx` ON `performers`;

-- DropIndex
DROP INDEX `organizations_youtube_channel_id_key` ON `organizations`;

-- DropIndex
DROP INDEX `organizations_twitter_username_key` ON `organizations`;

-- DropIndex
DROP INDEX `organizations_youtube_channel_id_idx` ON `organizations`;

-- DropIndex
DROP INDEX `organizations_twitter_username_idx` ON `organizations`;

-- CreateTable
CREATE TABLE `actors` (
    `id` VARCHAR(21) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `youtube_channel_id` VARCHAR(191) NULL,
    `twitter_username` VARCHAR(191) NULL,
    `avatar_id` VARCHAR(191) NULL,

    INDEX `actors_avatar_id_fkey`(`avatar_id` ASC),
    INDEX `actors_twitter_username_idx`(`twitter_username` ASC),
    UNIQUE INDEX `actors_twitter_username_key`(`twitter_username` ASC),
    INDEX `actors_youtube_channel_id_idx`(`youtube_channel_id` ASC),
    UNIQUE INDEX `actors_youtube_channel_id_key`(`youtube_channel_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable
ALTER TABLE `performers` DROP COLUMN `avatar_id`,
    DROP COLUMN `color`,
    DROP COLUMN `description`,
    DROP COLUMN `name`,
    DROP COLUMN `twitter_username`,
    DROP COLUMN `url`,
    DROP COLUMN `youtube_channel_id`,
    ADD COLUMN `actor_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `organizations` DROP COLUMN `avatar_id`,
    DROP COLUMN `color`,
    DROP COLUMN `description`,
    DROP COLUMN `name`,
    DROP COLUMN `twitter_username`,
    DROP COLUMN `url`,
    DROP COLUMN `youtube_channel_id`,
    ADD COLUMN `actor_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `streams_thumbnail_id_fkey` ON `streams`(`thumbnail_id` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `performers_actor_id_key` ON `performers`(`actor_id` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `organizations_actor_id_key` ON `organizations`(`actor_id` ASC);

-- AddForeignKey
ALTER TABLE `actors` ADD CONSTRAINT `actors_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `media_attachments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `performers` ADD CONSTRAINT `performers_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

