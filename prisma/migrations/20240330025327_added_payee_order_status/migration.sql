-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('commande', 'recu', 'payee', 'livrairee', 'annuller') NOT NULL DEFAULT 'commande';
