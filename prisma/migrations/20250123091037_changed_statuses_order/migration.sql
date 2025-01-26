/*
  Warnings:

  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('nonConfirme', 'payee', 'processing', 'shipped', 'livree', 'annulee') NOT NULL DEFAULT 'nonConfirme';
