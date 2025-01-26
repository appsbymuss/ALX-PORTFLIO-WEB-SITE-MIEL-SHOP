-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `order_item_ibfk_1`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `order_item_ibfk_2`;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
