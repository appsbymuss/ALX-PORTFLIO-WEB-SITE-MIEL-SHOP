/*
  Warnings:

  - Added the required column `rating` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` MODIFY `streetAddress` VARCHAR(400) NOT NULL,
    MODIFY `streetAddress2` VARCHAR(400) NULL;

-- AlterTable
ALTER TABLE `brand` MODIFY `description` VARCHAR(250) NULL;

-- AlterTable
ALTER TABLE `category` MODIFY `description` VARCHAR(250) NULL;

-- AlterTable
ALTER TABLE `factureitem` MODIFY `productDescription` VARCHAR(6000) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `benefits` VARCHAR(191) NULL,
    ADD COLUMN `flavor` VARCHAR(191) NULL,
    ADD COLUMN `origin` VARCHAR(191) NULL,
    ADD COLUMN `rating` INTEGER NOT NULL,
    ADD COLUMN `reviews` VARCHAR(191) NULL,
    ADD COLUMN `special_label` ENUM('most_sold', 'new') NULL,
    ADD COLUMN `texture` VARCHAR(191) NULL,
    ADD COLUMN `usage` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(350) NOT NULL,
    MODIFY `description` VARCHAR(6000) NOT NULL;

-- AlterTable
ALTER TABLE `stock_product` MODIFY `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` MODIFY `firstName` VARCHAR(150) NOT NULL,
    MODIFY `lastName` VARCHAR(150) NOT NULL;
