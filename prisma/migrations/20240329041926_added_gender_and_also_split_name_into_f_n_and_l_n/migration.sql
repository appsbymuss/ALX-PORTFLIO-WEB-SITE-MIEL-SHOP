/*
  Warnings:

  - You are about to drop the column `fullName` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `fullName`,
    ADD COLUMN `firstName` VARCHAR(100) NOT NULL,
    ADD COLUMN `gender` ENUM('M', 'F') NOT NULL,
    ADD COLUMN `lastName` VARCHAR(100) NOT NULL;
