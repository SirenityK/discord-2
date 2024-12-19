/*
  Warnings:

  - Added the required column `imageExtension` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "imageExtension" TEXT NOT NULL;
