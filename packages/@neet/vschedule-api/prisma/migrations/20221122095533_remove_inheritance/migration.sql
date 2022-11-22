-- DropForeignKey
ALTER TABLE `actors` DROP FOREIGN KEY `actors_avatar_id_fkey`;

-- DropForeignKey
ALTER TABLE `organizations` DROP FOREIGN KEY `organizations_actor_id_fkey`;

-- DropForeignKey
ALTER TABLE `performers` DROP FOREIGN KEY `performers_actor_id_fkey`;

ALTER TABLE `organizations`
    ADD COLUMN `avatar_id` VARCHAR(191) NULL,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `twitter_username` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    ADD COLUMN `youtube_channel_id` VARCHAR(191) NULL;

ALTER TABLE `performers`
    ADD COLUMN `avatar_id` VARCHAR(191) NULL,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `twitter_username` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    ADD COLUMN `youtube_channel_id` VARCHAR(191) NULL;

UPDATE `organizations`
  INNER JOIN `actors` ON `organizations`.`actor_id` = `actors`.`id`
  SET `organizations`.`avatar_id` = `actors`.`avatar_id`,
      `organizations`.`color` = `actors`.`color`,
      `organizations`.`description` = `actors`.`description`,
      `organizations`.`name` = `actors`.`name`,
      `organizations`.`twitter_username` = `actors`.`twitter_username`,
      `organizations`.`url` = `actors`.`url`,
      `organizations`.`youtube_channel_id` = `actors`.`youtube_channel_id`;

UPDATE `performers`
  INNER JOIN `actors` ON `performers`.`actor_id` = `actors`.`id`
  SET `performers`.`avatar_id` = `actors`.`avatar_id`,
      `performers`.`color` = `actors`.`color`,
      `performers`.`description` = `actors`.`description`,
      `performers`.`name` = `actors`.`name`,
      `performers`.`twitter_username` = `actors`.`twitter_username`,
      `performers`.`url` = `actors`.`url`,
      `performers`.`youtube_channel_id` = `actors`.`youtube_channel_id`;

ALTER TABLE `organizations`
    DROP COLUMN `actor_id`,
    MODIFY `color` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

ALTER TABLE `performers`
    DROP COLUMN `actor_id`,
    MODIFY `color` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `actors`;

-- CreateIndex
CREATE UNIQUE INDEX `organizations_youtube_channel_id_key` ON `organizations`(`youtube_channel_id`);

-- CreateIndex
CREATE UNIQUE INDEX `organizations_twitter_username_key` ON `organizations`(`twitter_username`);

-- CreateIndex
CREATE INDEX `organizations_youtube_channel_id_idx` ON `organizations`(`youtube_channel_id`);

-- CreateIndex
CREATE INDEX `organizations_twitter_username_idx` ON `organizations`(`twitter_username`);

-- CreateIndex
CREATE UNIQUE INDEX `performers_youtube_channel_id_key` ON `performers`(`youtube_channel_id`);

-- CreateIndex
CREATE UNIQUE INDEX `performers_twitter_username_key` ON `performers`(`twitter_username`);

-- CreateIndex
CREATE INDEX `performers_youtube_channel_id_idx` ON `performers`(`youtube_channel_id`);

-- CreateIndex
CREATE INDEX `performers_twitter_username_idx` ON `performers`(`twitter_username`);

-- AddForeignKey
ALTER TABLE `performers` ADD CONSTRAINT `performers_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `media_attachments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `media_attachments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
