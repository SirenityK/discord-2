-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_currentChannelId_currentServerId_fkey";

-- DropIndex
DROP INDEX "Channel_id_serverId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "channelId" TEXT,
ADD COLUMN     "currentChannel" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
