-- AlterTable
ALTER TABLE `Blog` MODIFY `status` ENUM('ACHIEVED', 'DRAFT', 'LIVE', 'SCHEDULED') NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE `Product` MODIFY `status` ENUM('ACHIEVED', 'DRAFT', 'LIVE', 'SCHEDULED') NOT NULL DEFAULT 'DRAFT';
