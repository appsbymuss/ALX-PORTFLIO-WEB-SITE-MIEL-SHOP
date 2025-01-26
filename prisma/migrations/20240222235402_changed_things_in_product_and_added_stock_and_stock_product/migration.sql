-- CreateTable
CREATE TABLE `stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` SMALLINT NOT NULL DEFAULT 0,
    `modified_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),

    INDEX `product_id`(`product_id`),
    UNIQUE INDEX `product_and_stock_id`(`stock_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_product` ADD CONSTRAINT `stock_product_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock_product` ADD CONSTRAINT `stock_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
