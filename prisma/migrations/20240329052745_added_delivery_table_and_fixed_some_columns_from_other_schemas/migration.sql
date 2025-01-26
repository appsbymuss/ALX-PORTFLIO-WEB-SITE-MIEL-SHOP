/*
  Warnings:

  - You are about to drop the column `order_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_order]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_order` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_user_id_fkey`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `order_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `id_order` INTEGER NOT NULL,
    ADD COLUMN `id_user` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `delivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ExpeditionNum` VARCHAR(191) NOT NULL,
    `id_order` INTEGER NOT NULL,
    `modeCol` ENUM('REL') NOT NULL,
    `modeLiv` ENUM('mode24R', 'modeHOM') NOT NULL,
    `NDossier` VARCHAR(50) NULL,
    `NClient` VARCHAR(50) NULL,
    `Dest_Langage` CHAR(2) NULL,
    `Dest_Ad1` VARCHAR(200) NOT NULL,
    `Dest_Ad2` VARCHAR(200) NULL,
    `Dest_Ad3` VARCHAR(200) NOT NULL,
    `Dest_Ad4` VARCHAR(200) NULL,
    `Dest_Ville` VARCHAR(50) NOT NULL,
    `Dest_CP` VARCHAR(25) NOT NULL,
    `Dest_Pays` CHAR(2) NOT NULL,
    `Dest_Tel1` VARCHAR(50) NOT NULL,
    `Dest_Mail` VARCHAR(50) NULL,
    `Poids` VARCHAR(10) NOT NULL,
    `Longeur` VARCHAR(50) NULL,
    `Taille` VARCHAR(50) NULL,
    `CRT_Valeur` VARCHAR(50) NULL,
    `CRT_Devise` VARCHAR(50) NULL,
    `Expe_Valeur` VARCHAR(50) NULL,
    `Expe_Devise` VARCHAR(50) NULL,
    `COL_Rel_Pays` CHAR(2) NOT NULL,
    `COL_Rel` VARCHAR(10) NOT NULL,
    `LIV_Rel_Pays` CHAR(2) NULL,
    `LIV_Rel` VARCHAR(10) NULL,
    `TAvisage` VARCHAR(50) NULL,
    `Montage` VARCHAR(50) NULL,
    `TRDV` VARCHAR(50) NULL,
    `Assurance` VARCHAR(50) NULL,
    `Instructions` VARCHAR(200) NULL,
    `Texte` VARCHAR(150) NULL,
    `URL_Etq_A4` VARCHAR(140) NOT NULL,
    `URL_Etq_A5` VARCHAR(140) NULL,
    `URL_Etq_10x15` VARCHAR(140) NULL,

    UNIQUE INDEX `delivery_ExpeditionNum_key`(`ExpeditionNum`),
    UNIQUE INDEX `delivery_id_order_key`(`id_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `payment_id_order_key` ON `payment`(`id_order`);

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
