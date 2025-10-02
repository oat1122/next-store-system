-- CreateTable
CREATE TABLE `Computer` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NULL,
    `model` VARCHAR(191) NULL,
    `cpu` VARCHAR(191) NULL,
    `gpu` VARCHAR(191) NULL,
    `ramGb` INTEGER NULL,
    `storageGb` INTEGER NULL,
    `storageType` VARCHAR(191) NULL,
    `condition` VARCHAR(191) NULL,
    `owner` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Computer_code_key`(`code`),
    INDEX `idx_computer_name`(`name`),
    INDEX `idx_computer_code`(`code`),
    INDEX `idx_owner_location`(`owner`, `location`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    INDEX `idx_tag_name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComputerTag` (
    `computerId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    INDEX `idx_ct_computer`(`computerId`),
    INDEX `idx_ct_tag`(`tagId`),
    PRIMARY KEY (`computerId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComputerImage` (
    `id` VARCHAR(191) NOT NULL,
    `computerId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `isPrimary` BOOLEAN NOT NULL DEFAULT false,

    INDEX `idx_image_computer`(`computerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ComputerTag` ADD CONSTRAINT `ComputerTag_computerId_fkey` FOREIGN KEY (`computerId`) REFERENCES `Computer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComputerTag` ADD CONSTRAINT `ComputerTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComputerImage` ADD CONSTRAINT `ComputerImage_computerId_fkey` FOREIGN KEY (`computerId`) REFERENCES `Computer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
