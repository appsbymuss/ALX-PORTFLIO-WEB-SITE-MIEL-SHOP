/*
  Warnings:

  - You are about to drop the column `addressId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `adresse` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `order` table. All the data in the column will be lost.
  - Added the required column `id_address` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_ibfk_1`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `addressId`,
    DROP COLUMN `adresse`,
    DROP COLUMN `user_id`,
    ADD COLUMN `id_address` INTEGER NOT NULL,
    ADD COLUMN `id_user` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `user_id` ON `order`(`id_user`);

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
