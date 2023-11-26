-- CreateTable
CREATE TABLE `Card` (
    `id` VARCHAR(191) NOT NULL,
    `account_name` VARCHAR(191) NOT NULL,
    `authorization_code` VARCHAR(191) NOT NULL,
    `bin` VARCHAR(191) NOT NULL,
    `last4` VARCHAR(191) NOT NULL,
    `exp_month` VARCHAR(191) NOT NULL,
    `exp_year` VARCHAR(191) NOT NULL,
    `card_type` VARCHAR(191) NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Card_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
