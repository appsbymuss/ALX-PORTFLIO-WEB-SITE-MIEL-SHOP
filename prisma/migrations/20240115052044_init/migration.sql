-- CreateTable
CREATE TABLE `brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(250) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `image` LONGBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `couponCode` VARCHAR(50) NULL,
    `type` ENUM('product', 'order') NOT NULL,
    `percentage` TINYINT NOT NULL,
    `date_start` DATE NOT NULL,
    `date_end` DATE NOT NULL,
    `id_order` INTEGER NULL,
    `id_product` INTEGER NULL,

    UNIQUE INDEX `couponCode`(`couponCode`),
    INDEX `id_order`(`id_order`),
    INDEX `id_product`(`id_product`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adresseOrder` VARCHAR(200) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_item` (
    `id_order` INTEGER NOT NULL,
    `id_product` INTEGER NOT NULL,

    INDEX `id_product`(`id_product`),
    PRIMARY KEY (`id_order`, `id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `image` LONGBLOB NULL,
    `price` DECIMAL(6, 2) NOT NULL,
    `priceBarre` DECIMAL(6, 2) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `brand_id` INTEGER NOT NULL,

    INDEX `brand_id`(`brand_id`),
    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `numberPhone` VARCHAR(20) NOT NULL,
    `adresse` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL,
    `modified_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `coupon` ADD CONSTRAINT `coupon_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `coupon` ADD CONSTRAINT `coupon_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
