/*
  Warnings:

  - You are about to drop the column `graphs` on the `savedresearches` table. All the data in the column will be lost.
  - You are about to drop the column `informations` on the `savedresearches` table. All the data in the column will be lost.
  - Added the required column `isResearcher` to the `savedResearches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `savedresearches` DROP COLUMN `graphs`,
    DROP COLUMN `informations`,
    ADD COLUMN `college1` VARCHAR(191) NULL,
    ADD COLUMN `college2` VARCHAR(191) NULL,
    ADD COLUMN `isResearcher` BOOLEAN NOT NULL;
