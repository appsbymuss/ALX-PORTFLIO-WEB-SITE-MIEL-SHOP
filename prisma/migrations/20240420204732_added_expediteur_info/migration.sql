/*
  Warnings:

  - Added the required column `Expe_Ad1` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Expe_Ad3` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Expe_CP` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Expe_Pays` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Expe_Ville` to the `delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `Expe_Ad1` VARCHAR(200) NOT NULL,
    ADD COLUMN `Expe_Ad2` VARCHAR(200) NULL,
    ADD COLUMN `Expe_Ad3` VARCHAR(200) NOT NULL,
    ADD COLUMN `Expe_Ad4` VARCHAR(200) NULL,
    ADD COLUMN `Expe_CP` VARCHAR(25) NOT NULL,
    ADD COLUMN `Expe_Langage` CHAR(2) NULL,
    ADD COLUMN `Expe_Mail` VARCHAR(50) NULL,
    ADD COLUMN `Expe_Pays` CHAR(2) NOT NULL,
    ADD COLUMN `Expe_Tel1` VARCHAR(50) NULL,
    ADD COLUMN `Expe_Ville` VARCHAR(50) NOT NULL;
