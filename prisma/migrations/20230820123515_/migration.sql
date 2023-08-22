/*
  Warnings:

  - You are about to drop the column `total` on the `OrderProducts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `OrderProducts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderProducts` DROP COLUMN `total`,
    ADD COLUMN `Size` VARCHAR(191) NULL,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OrderProducts_productId_key` ON `OrderProducts`(`productId`);
