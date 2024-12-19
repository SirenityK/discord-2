/*
  Warnings:

  - You are about to drop the column `currentChannel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentChannelId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentServerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ChannelToServer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelId_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToServer" DROP CONSTRAINT "_ChannelToServer_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChannelToServer" DROP CONSTRAINT "_ChannelToServer_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentChannel",
DROP COLUMN "currentChannelId",
DROP COLUMN "currentServerId";

-- DropTable
DROP TABLE "_ChannelToServer";

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
