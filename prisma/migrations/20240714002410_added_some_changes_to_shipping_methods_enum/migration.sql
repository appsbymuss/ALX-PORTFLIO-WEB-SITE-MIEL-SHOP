/*
  Warnings:

  - You are about to alter the column `shippingMethod` on the `delivery` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `delivery` MODIFY `shippingMethod` ENUM('DOMICILE', 'RELAY', 'AUTRE') NULL;
