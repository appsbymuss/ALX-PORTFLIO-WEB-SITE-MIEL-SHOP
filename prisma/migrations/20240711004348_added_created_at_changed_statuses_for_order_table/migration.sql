/*
  Warnings:

  - You are about to drop the column `remboursementTotal` on the `factureitem` table. All the data in the column will be lost.
  - The values [recu] on the enum `order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `factureitem` DROP COLUMN `remboursementTotal`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status` ENUM('commande', 'payee', 'confirmee', 'livrairee', 'annuller') NOT NULL DEFAULT 'commande';
