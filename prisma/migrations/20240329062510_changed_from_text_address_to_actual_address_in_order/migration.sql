/*
  Warnings:

  - You are about to drop the column `adresseOrder` on the `order` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresse` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `adresseOrder`,
    ADD COLUMN `addressId` INTEGER NOT NULL,
    ADD COLUMN `adresse` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
