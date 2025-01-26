/*
  Warnings:

  - You are about to drop the column `Expe_Devise` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `Expe_Valeur` on the `delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `Expe_Devise`,
    DROP COLUMN `Expe_Valeur`,
    ADD COLUMN `Exp_Devise` VARCHAR(50) NULL,
    ADD COLUMN `Exp_Valeur` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `gender` ENUM('M', 'F', 'autre', 'nonSpecifie') NOT NULL DEFAULT 'nonSpecifie';
