-- DropForeignKey
ALTER TABLE `factureitem` DROP FOREIGN KEY `factureitem_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `factureitem` DROP FOREIGN KEY `factureitem_stock_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_product` DROP FOREIGN KEY `stock_product_ibfk_1`;

-- DropForeignKey
ALTER TABLE `stock_product` DROP FOREIGN KEY `stock_product_ibfk_2`;

-- AlterTable
ALTER TABLE `factureitem` MODIFY `product_id` INTEGER NULL,
    MODIFY `stock_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `stock_product` ADD CONSTRAINT `stock_product_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock_product` ADD CONSTRAINT `stock_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `factureitem` ADD CONSTRAINT `factureitem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factureitem` ADD CONSTRAINT `factureitem_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
