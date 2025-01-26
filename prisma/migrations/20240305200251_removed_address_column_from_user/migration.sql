/*
  Warnings:

  - You are about to drop the column `adresse` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `adresse`,
    ADD COLUMN `verified_at` DATETIME(3) NULL,
    ADD COLUMN `verify_token` VARCHAR(191) NULL;
