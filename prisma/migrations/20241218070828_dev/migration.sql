/*
  Warnings:

  - A unique constraint covering the columns `[id,serverId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentChannelId" TEXT,
ADD COLUMN     "currentServerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_serverId_key" ON "Channel"("id", "serverId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentChannelId_currentServerId_fkey" FOREIGN KEY ("currentChannelId", "currentServerId") REFERENCES "Channel"("id", "serverId") ON DELETE SET NULL ON UPDATE CASCADE;
