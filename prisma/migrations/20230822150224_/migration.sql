/*
  Warnings:

  - You are about to drop the `OrderProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `OrderProducts` DROP FOREIGN KEY `OrderProducts_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderProducts` DROP FOREIGN KEY `OrderProducts_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderProducts` DROP FOREIGN KEY `OrderProducts_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- DropTable
DROP TABLE `OrderProducts`;

-- DropTable
DROP TABLE `Orders`;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `color` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `cartId` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OrderProduct_id_key`(`id`),
    UNIQUE INDEX `OrderProduct_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(191) NOT NULL,
    `status` ENUM('PROCESSING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELED') NOT NULL DEFAULT 'PROCESSING',
    `userId` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `addressId` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `expectedDeliveryDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_id_key`(`id`),
    UNIQUE INDEX `Order_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Blog_title_key` ON `Blog`(`title`);

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
