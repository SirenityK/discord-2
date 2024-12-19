/*
  Warnings:

  - You are about to drop the column `defaultChannel` on the `Server` table. All the data in the column will be lost.
  - Added the required column `defaultChannelId` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" DROP COLUMN "defaultChannel",
ADD COLUMN     "defaultChannelId" TEXT NOT NULL;
