/*
  Warnings:

  - Added the required column `product_type_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `product_type_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `product_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `tva_percentage` DECIMAL(5, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `product_type_id` ON `product`(`product_type_id`);

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`product_type_id`) REFERENCES `product_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
