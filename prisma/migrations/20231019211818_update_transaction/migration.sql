/*
  Warnings:

  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `shippingFee` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `amount` DOUBLE NOT NULL;
