-- AlterTable
ALTER TABLE `actors` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `media_attachments` MODIFY `base64` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `streams` MODIFY `description` TEXT NULL;
