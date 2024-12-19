-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_serverId_fkey";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_ChannelToServer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChannelToServer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChannelToServer_B_index" ON "_ChannelToServer"("B");

-- AddForeignKey
ALTER TABLE "_ChannelToServer" ADD CONSTRAINT "_ChannelToServer_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToServer" ADD CONSTRAINT "_ChannelToServer_B_fkey" FOREIGN KEY ("B") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
