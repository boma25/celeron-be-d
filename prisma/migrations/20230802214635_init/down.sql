-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderProducts` DROP FOREIGN KEY `OrderProducts_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderProducts` DROP FOREIGN KEY `OrderProducts_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_barndId_fkey`;

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
DROP TABLE `OrderProducts`;

-- DropTable
DROP TABLE `Orders`;

-- DropTable
DROP TABLE `Transaction`;

-- DropTable
DROP TABLE `Cart`;

-- DropTable
DROP TABLE `Brand`;

-- DropTable
DROP TABLE `ProductCategory`;

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `ProductMedia`;

-- DropTable
DROP TABLE `Admin`;

-- DropTable
DROP TABLE `_ProductToProductCategory`;

