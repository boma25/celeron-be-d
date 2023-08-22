/*
  Warnings:

  - You are about to drop the column `Size` on the `OrderProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OrderProducts` DROP COLUMN `Size`,
    ADD COLUMN `size` VARCHAR(191) NULL;
