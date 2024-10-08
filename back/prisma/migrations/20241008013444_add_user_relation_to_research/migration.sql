/*
  Warnings:

  - Added the required column `userId` to the `savedResearches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `savedresearches` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `savedResearches` ADD CONSTRAINT `savedResearches_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
