-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_manufacturerId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_modelId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `manufacturerId` varchar(191) NOT NULL,
    MODIFY `modelId` varchar(191) NOT NULL;

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
CREATE INDEX `Product_manufacturerId_fkey` ON `Product`(`manufacturerId` ASC);

-- CreateIndex
CREATE INDEX `Product_modelId_fkey` ON `Product`(`modelId` ASC);

-- CreateIndex
CREATE INDEX `ProductMedia_productId_fkey` ON `ProductMedia`(`productId` ASC);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_manufacturerId_fkey` FOREIGN KEY (`manufacturerId`) REFERENCES `Manufacturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

