-- AlterTable
ALTER TABLE `Card` DROP COLUMN `default`;

-- CreateIndex
CREATE INDEX `Address_userId_fkey` ON `Address`(`userId` ASC);

-- CreateIndex
CREATE INDEX `OrderProduct_cartId_fkey` ON `OrderProduct`(`cartId` ASC);

-- CreateIndex
CREATE INDEX `OrderProduct_orderId_fkey` ON `OrderProduct`(`orderId` ASC);

-- CreateIndex
CREATE INDEX `Order_addressId_fkey` ON `Order`(`addressId` ASC);

-- CreateIndex
CREATE INDEX `Order_userId_fkey` ON `Order`(`userId` ASC);

-- CreateIndex
CREATE INDEX `Transaction_userId_fkey` ON `Transaction`(`userId` ASC);

-- CreateIndex
CREATE INDEX `Product_manufacturerId_fkey` ON `Product`(`manufacturerId` ASC);

-- CreateIndex
CREATE INDEX `Product_modelId_fkey` ON `Product`(`modelId` ASC);

-- CreateIndex
CREATE INDEX `ProductMedia_productId_fkey` ON `ProductMedia`(`productId` ASC);

-- CreateIndex
CREATE INDEX `Card_userId_fkey` ON `Card`(`userId` ASC);

