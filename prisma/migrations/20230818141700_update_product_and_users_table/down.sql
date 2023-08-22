-- DropForeignKey
ALTER TABLE `Model` DROP FOREIGN KEY `Model_manufacturerId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_manufacturerId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_modelId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailVerified`,
    DROP COLUMN `phoneNumberVerified`,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `achieved`,
    DROP COLUMN `configurable`,
    DROP COLUMN `manufacturerId`,
    DROP COLUMN `modelId`,
    DROP COLUMN `state`,
    DROP COLUMN `status`,
    DROP COLUMN `year`,
    ADD COLUMN `barndId` VARCHAR(191) NOT NULL,
    MODIFY `colors` json NOT NULL,
    MODIFY `sizes` json NOT NULL;

-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `lastActive`,
    MODIFY `adminType` enum('SUPER_ADMIN','ADMIN') NOT NULL DEFAULT 'ADMIN';

-- DropTable
DROP TABLE `Manufacturer`;

-- DropTable
DROP TABLE `Model`;

-- DropTable
DROP TABLE `Blog`;

-- CreateTable
CREATE TABLE `Brand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Brand_id_key`(`id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Address_userId_fkey` ON `Address`(`userId` ASC);

-- CreateIndex
CREATE INDEX `OrderProducts_cartId_fkey` ON `OrderProducts`(`cartId` ASC);

-- CreateIndex
CREATE INDEX `OrderProducts_orderId_fkey` ON `OrderProducts`(`orderId` ASC);

-- CreateIndex
CREATE INDEX `Orders_addressId_fkey` ON `Orders`(`addressId` ASC);

-- CreateIndex
CREATE INDEX `Orders_userId_fkey` ON `Orders`(`userId` ASC);

-- CreateIndex
CREATE INDEX `Transaction_userId_fkey` ON `Transaction`(`userId` ASC);

-- CreateIndex
CREATE INDEX `Product_barndId_fkey` ON `Product`(`barndId` ASC);

-- CreateIndex
CREATE INDEX `ProductMedia_productId_fkey` ON `ProductMedia`(`productId` ASC);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_barndId_fkey` FOREIGN KEY (`barndId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

