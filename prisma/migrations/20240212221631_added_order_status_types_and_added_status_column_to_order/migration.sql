-- AlterTable
ALTER TABLE `order` ADD COLUMN `status` ENUM('commande', 'recu', 'livrairee', 'annuller') NOT NULL DEFAULT 'commande';
