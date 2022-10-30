-- AlterTable
ALTER TABLE `media_attachments`
  ADD COLUMN `height` DOUBLE NULL,
  ADD COLUMN `width` DOUBLE NULL;

UPDATE `media_attachments`
  SET `width` = 1, `height` = 1;

ALTER TABLE `media_attachments` MODIFY `height` DOUBLE NOT NULL;
ALTER TABLE `media_attachments` MODIFY `width` DOUBLE NOT NULL;
