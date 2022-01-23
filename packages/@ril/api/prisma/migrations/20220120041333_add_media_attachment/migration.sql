-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "avatarId" TEXT;

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "thumbnailId" TEXT;

-- CreateTable
CREATE TABLE "MediaAttachment" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "blur" TEXT NOT NULL,
    "bucket" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "MediaAttachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "MediaAttachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
