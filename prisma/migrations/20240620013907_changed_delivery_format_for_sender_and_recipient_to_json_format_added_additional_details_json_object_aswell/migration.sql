/*
  Warnings:

  - You are about to drop the column `Assurance` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `COL_Rel` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `COL_Rel_Pays` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `CRT_Devise` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `CRT_Valeur` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Ad1` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Ad2` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Ad3` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Ad4` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_CP` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Langage` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Mail` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Pays` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Tel1` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Dest_Ville` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Exp_Devise` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Exp_Valeur` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Ad1` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Ad2` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Ad3` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Ad4` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_CP` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Langage` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Mail` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Pays` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Tel1` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Ville` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Instructions` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `LIV_Rel` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `LIV_Rel_Pays` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Longeur` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Montage` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `NClient` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `NDossier` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Poids` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `TAvisage` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `TRDV` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Taille` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Texte` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `URL_Etq_10x15` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `URL_Etq_A4` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `URL_Etq_A5` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `modeCol` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `modeLiv` on the `delivery` table. All the data in the column will be lost.
  - Added the required column `recipientDetails` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderDetails` to the `delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceProvider` to the `delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `Assurance`,
    DROP COLUMN `COL_Rel`,
    DROP COLUMN `COL_Rel_Pays`,
    DROP COLUMN `CRT_Devise`,
    DROP COLUMN `CRT_Valeur`,
    DROP COLUMN `Dest_Ad1`,
    DROP COLUMN `Dest_Ad2`,
    DROP COLUMN `Dest_Ad3`,
    DROP COLUMN `Dest_Ad4`,
    DROP COLUMN `Dest_CP`,
    DROP COLUMN `Dest_Langage`,
    DROP COLUMN `Dest_Mail`,
    DROP COLUMN `Dest_Pays`,
    DROP COLUMN `Dest_Tel1`,
    DROP COLUMN `Dest_Ville`,
    DROP COLUMN `Exp_Devise`,
    DROP COLUMN `Exp_Valeur`,
    DROP COLUMN `Expe_Ad1`,
    DROP COLUMN `Expe_Ad2`,
    DROP COLUMN `Expe_Ad3`,
    DROP COLUMN `Expe_Ad4`,
    DROP COLUMN `Expe_CP`,
    DROP COLUMN `Expe_Langage`,
    DROP COLUMN `Expe_Mail`,
    DROP COLUMN `Expe_Pays`,
    DROP COLUMN `Expe_Tel1`,
    DROP COLUMN `Expe_Ville`,
    DROP COLUMN `Instructions`,
    DROP COLUMN `LIV_Rel`,
    DROP COLUMN `LIV_Rel_Pays`,
    DROP COLUMN `Longeur`,
    DROP COLUMN `Montage`,
    DROP COLUMN `NClient`,
    DROP COLUMN `NDossier`,
    DROP COLUMN `Poids`,
    DROP COLUMN `TAvisage`,
    DROP COLUMN `TRDV`,
    DROP COLUMN `Taille`,
    DROP COLUMN `Texte`,
    DROP COLUMN `URL_Etq_10x15`,
    DROP COLUMN `URL_Etq_A4`,
    DROP COLUMN `URL_Etq_A5`,
    DROP COLUMN `modeCol`,
    DROP COLUMN `modeLiv`,
    ADD COLUMN `additionalDetails` JSON NULL,
    ADD COLUMN `recipientDetails` JSON NOT NULL,
    ADD COLUMN `senderDetails` JSON NOT NULL,
    ADD COLUMN `serviceProvider` VARCHAR(191) NOT NULL,
    ADD COLUMN `shippingMethod` VARCHAR(191) NULL,
    ADD COLUMN `trackingNumber` VARCHAR(191) NULL;
