/*
  Warnings:

  - You are about to drop the column `barndId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `manufacturerId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_barndId_fkey`;

-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `lastActive` DATETIME(3) NULL,
    MODIFY `adminType` ENUM('SUPER_ADMIN', 'ADMIN', 'VIEWER') NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `barndId`,
    ADD COLUMN `achieved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `configurable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `manufacturerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `modelId` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` ENUM('ON_SALE', 'COMMING_SOON', 'OUT_OF_STOCK') NULL,
    ADD COLUMN `status` ENUM('ACHIEVED', 'DRAFT', 'LIVE') NOT NULL DEFAULT 'DRAFT',
    ADD COLUMN `year` VARCHAR(191) NULL,
    MODIFY `colors` JSON NULL,
    MODIFY `sizes` JSON NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `verified`,
    ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phoneNumberVerified` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Brand`;

-- CreateTable
CREATE TABLE `Manufacturer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Manufacturer_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Model` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `years` JSON NOT NULL,
    `manufacturerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Model_id_key`(`id`),
    UNIQUE INDEX `Model_manufacturerId_key`(`manufacturerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` VARCHAR(191) NOT NULL,
    `coverImage` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `status` ENUM('ACHIEVED', 'DRAFT', 'LIVE') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Blog_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_manufacturerId_fkey` FOREIGN KEY (`manufacturerId`) REFERENCES `Manufacturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_manufacturerId_fkey` FOREIGN KEY (`manufacturerId`) REFERENCES `Manufacturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
