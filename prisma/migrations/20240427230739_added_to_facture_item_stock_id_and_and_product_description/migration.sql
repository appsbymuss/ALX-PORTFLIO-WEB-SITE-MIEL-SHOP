/*
  Warnings:

  - Added the required column `stock_id` to the `FactureItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `factureitem` ADD COLUMN `productDescription` VARCHAR(191) NULL,
    ADD COLUMN `stock_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `factureitem` ADD CONSTRAINT `factureitem_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- onBEFORE TRIGGER [on FACTURE_ITEM]:
CREATE TRIGGER tr_BF__INS_factureItem
  BEFORE INSERT
  ON factureitem FOR EACH ROW
  BEGIN
    DECLARE available_quantity INT;

    SELECT quantity INTO available_quantity
    FROM stock_product
    WHERE stock_id = NEW.stock_id
      AND product_id = NEW.product_id;

    IF available_quantity < NEW.quantity THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;
  END ;

-- onINSERT TRIGGER [on FACTURE_ITEM]:
CREATE TRIGGER tr_AF__INS_factureItem
  AFTER INSERT
  ON factureitem FOR EACH ROW
  BEGIN
    UPDATE stock_product
    SET quantity = quantity - NEW.quantity
    WHERE stock_id = NEW.stock_id
      AND product_id = NEW.product_id;
  END ;
