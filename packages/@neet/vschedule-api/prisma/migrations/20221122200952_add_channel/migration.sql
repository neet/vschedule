/*
  Warnings:

  - Added the required column `channel_id` to the `streams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `streams` ADD COLUMN `channel_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `channels` (
    `id` VARCHAR(21) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `performer_id` VARCHAR(191) NULL,
    `organization_id` VARCHAR(191) NULL,

    INDEX `channels_performer_id_organization_id_idx`(`performer_id`, `organization_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `youtube_channels` (
    `id` VARCHAR(21) NOT NULL,
    `youtubeChannelId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `youtube_channels_youtubeChannelId_key`(`youtubeChannelId`),
    INDEX `youtube_channels_youtubeChannelId_idx`(`youtubeChannelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `streams` ADD CONSTRAINT `streams_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels` ADD CONSTRAINT `channels_performer_id_fkey` FOREIGN KEY (`performer_id`) REFERENCES `performers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels` ADD CONSTRAINT `channels_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youtube_channels` ADD CONSTRAINT `youtube_channels_id_fkey` FOREIGN KEY (`id`) REFERENCES `channels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
