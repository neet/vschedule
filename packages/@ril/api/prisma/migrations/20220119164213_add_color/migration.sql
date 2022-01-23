/*
  Warnings:

  - A unique constraint covering the columns `[youtubeChannelId]` on the table `Actor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twitterUsername]` on the table `Actor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Actor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "color" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Actor_youtubeChannelId_key" ON "Actor"("youtubeChannelId");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_twitterUsername_key" ON "Actor"("twitterUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_url_key" ON "Stream"("url");
