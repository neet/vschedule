/*
  Warnings:

  - You are about to drop the column `base64` on the `media_attachments` table. All the data in the column will be lost.
  - Added the required column `blur_data_uri` to the `media_attachments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `media_attachments` DROP COLUMN `base64`,
    ADD COLUMN `blur_data_uri` TEXT NOT NULL;
