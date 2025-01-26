/*
  Warnings:

  - You are about to drop the column `id_order` on the `coupon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `coupon` DROP FOREIGN KEY `coupon_ibfk_1`;

-- AlterTable
ALTER TABLE `coupon` DROP COLUMN `id_order`,
    ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT (now());

-- CreateTable
CREATE TABLE `applied_coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_coupon` INTEGER NOT NULL,
    `id_order` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),

    INDEX `id_coupon`(`id_coupon`),
    INDEX `id_order`(`id_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applied_coupon` ADD CONSTRAINT `applied_coupon_ibfk_1` FOREIGN KEY (`id_coupon`) REFERENCES `coupon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `applied_coupon` ADD CONSTRAINT `applied_coupon_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
