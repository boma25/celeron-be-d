/*
  Warnings:

  - You are about to alter the column `quantity` on the `OrderProducts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `OrderProducts` MODIFY `quantity` INTEGER NOT NULL;
