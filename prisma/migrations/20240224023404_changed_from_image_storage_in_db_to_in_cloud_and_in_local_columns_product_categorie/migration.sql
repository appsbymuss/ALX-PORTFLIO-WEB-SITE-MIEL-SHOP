/*
  Warnings:

  - You are about to drop the column `image` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `image`,
    ADD COLUMN `image_path` VARCHAR(191) NULL,
    ADD COLUMN `image_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `image`,
    ADD COLUMN `image_path` VARCHAR(191) NULL,
    ADD COLUMN `image_url` VARCHAR(191) NULL;
