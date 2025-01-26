-- CreateTable
CREATE TABLE `facture` (
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `paymentMethod` VARCHAR(191) NOT NULL,
    `couponCode` VARCHAR(50) NULL,
    `couponCodeType` ENUM('product', 'order') NULL,
    `couponCodeProductId` INTEGER NULL,
    `couponRate` DECIMAL(5, 2) NULL,
    `shippingExpenses` DECIMAL(10, 2) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `delivery_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `facture_invoiceNumber_key`(`invoiceNumber`),
    INDEX `order_id`(`order_id`),
    INDEX `user_id`(`user_id`),
    INDEX `delivery_id`(`delivery_id`),
    PRIMARY KEY (`invoiceNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factureitem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facture_id` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `tvaRate` DECIMAL(5, 2) NOT NULL,
    `tvaTotal` DECIMAL(10, 2) NOT NULL,
    `remboursementTotal` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `product_id`(`product_id`),
    UNIQUE INDEX `unique_facture_product`(`facture_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_delivery_id_fkey` FOREIGN KEY (`delivery_id`) REFERENCES `delivery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factureitem` ADD CONSTRAINT `factureitem_facture_id_fkey` FOREIGN KEY (`facture_id`) REFERENCES `facture`(`invoiceNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factureitem` ADD CONSTRAINT `factureitem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
