/*
  Warnings:

  - You are about to alter the column `paymentStatus` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `payment` MODIFY `paymentStatus` ENUM('paid', 'refunded') NOT NULL DEFAULT 'paid';
