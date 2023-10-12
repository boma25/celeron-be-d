-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderProduct` DROP FOREIGN KEY `OrderProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderProduct` DROP FOREIGN KEY `OrderProduct_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderProduct` DROP FOREIGN KEY `OrderProduct_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Model` DROP FOREIGN KEY `Model_manufacturerId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_manufacturerId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductMedia` DROP FOREIGN KEY `ProductMedia_productId_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToProductCategory` DROP FOREIGN KEY `_ProductToProductCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToProductCategory` DROP FOREIGN KEY `_ProductToProductCategory_B_fkey`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `Address`;

-- DropTable
DROP TABLE `OrderProduct`;

-- DropTable
DROP TABLE `Order`;

-- DropTable
DROP TABLE `Transaction`;

-- DropTable
DROP TABLE `Cart`;

-- DropTable
DROP TABLE `Manufacturer`;

-- DropTable
DROP TABLE `Model`;

-- DropTable
DROP TABLE `ProductCategory`;

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `ProductMedia`;

-- DropTable
DROP TABLE `Admin`;

-- DropTable
DROP TABLE `Blog`;

-- DropTable
DROP TABLE `_ProductToProductCategory`;

