-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(70) NOT NULL,
    `countryCode` CHAR(2) NOT NULL,
    `city` VARCHAR(70) NULL,
    `province` VARCHAR(70) NOT NULL,
    `postalCode` VARCHAR(8) NOT NULL,
    `streetAddress` VARCHAR(250) NOT NULL,
    `streetAddress2` VARCHAR(250) NULL,
    `provided_by_user_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT (now()),

    INDEX `provided_by_user_id`(`provided_by_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`provided_by_user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
