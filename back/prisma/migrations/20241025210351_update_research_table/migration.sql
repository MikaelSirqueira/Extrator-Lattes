/*
  Warnings:

  - You are about to drop the column `isResearcher` on the `savedresearches` table. All the data in the column will be lost.
  - Added the required column `begin_year` to the `savedResearches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drop_duplicates` to the `savedResearches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_year` to the `savedResearches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_researcher` to the `savedResearches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `savedresearches` DROP COLUMN `isResearcher`,
    ADD COLUMN `begin_year` VARCHAR(191) NOT NULL,
    ADD COLUMN `drop_duplicates` BOOLEAN NOT NULL,
    ADD COLUMN `end_year` VARCHAR(191) NOT NULL,
    ADD COLUMN `is_researcher` BOOLEAN NOT NULL,
    ADD COLUMN `selected_files` VARCHAR(191) NULL,
    ADD COLUMN `selected_files_ppg` VARCHAR(191) NULL;
