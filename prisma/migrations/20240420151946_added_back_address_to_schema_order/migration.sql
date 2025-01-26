/*
  Warnings:

  - Added the required column `id_address` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `id_address` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
