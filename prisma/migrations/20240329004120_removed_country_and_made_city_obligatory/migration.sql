/*
  Warnings:

  - You are about to drop the column `country` on the `address` table. All the data in the column will be lost.
  - Made the column `city` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `country`,
    MODIFY `city` VARCHAR(70) NOT NULL,
    MODIFY `province` VARCHAR(70) NULL,
    MODIFY `postalCode` VARCHAR(50) NOT NULL;
