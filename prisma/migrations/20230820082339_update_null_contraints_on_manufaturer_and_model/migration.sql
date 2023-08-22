-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_manufacturerId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_modelId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `manufacturerId` VARCHAR(191) NULL,
    MODIFY `modelId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_manufacturerId_fkey` FOREIGN KEY (`manufacturerId`) REFERENCES `Manufacturer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
