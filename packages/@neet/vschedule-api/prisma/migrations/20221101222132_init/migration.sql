-- CreateTable
CREATE TABLE `media_attachments` (
    `id` VARCHAR(21) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `width` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `base64` TEXT NOT NULL,
    `bucket` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `media_attachments_filename_idx`(`filename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `streams` (
    `id` VARCHAR(21) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `started_at` DATETIME(3) NOT NULL,
    `ended_at` DATETIME(3) NULL,
    `owner_id` VARCHAR(191) NOT NULL,
    `thumbnail_id` VARCHAR(191) NULL,

    UNIQUE INDEX `streams_url_key`(`url`),
    INDEX `streams_url_idx`(`url`),
    INDEX `streams_created_at_idx`(`created_at`),
    INDEX `streams_updated_at_idx`(`updated_at`),
    INDEX `streams_started_at_idx`(`started_at`),
    INDEX `streams_ended_at_idx`(`ended_at`),
    INDEX `streams_owner_id_idx`(`owner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

    UNIQUE INDEX `actors_youtube_channel_id_key`(`youtube_channel_id`),
    UNIQUE INDEX `actors_twitter_username_key`(`twitter_username`),
    INDEX `actors_youtube_channel_id_idx`(`youtube_channel_id`),
    INDEX `actors_twitter_username_idx`(`twitter_username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `performers` (
    `id` VARCHAR(21) NOT NULL,
    `actor_id` VARCHAR(191) NOT NULL,
    `organization_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `performers_id_key`(`id`),
    UNIQUE INDEX `performers_actor_id_key`(`actor_id`),
    INDEX `performers_organization_id_idx`(`organization_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizations` (
    `id` VARCHAR(21) NOT NULL,
    `actor_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `organizations_id_key`(`id`),
    UNIQUE INDEX `organizations_actor_id_key`(`actor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `streams` ADD CONSTRAINT `streams_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `performers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `streams` ADD CONSTRAINT `streams_thumbnail_id_fkey` FOREIGN KEY (`thumbnail_id`) REFERENCES `media_attachments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actors` ADD CONSTRAINT `actors_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `media_attachments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `performers` ADD CONSTRAINT `performers_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `performers` ADD CONSTRAINT `performers_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`actor_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `actors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
