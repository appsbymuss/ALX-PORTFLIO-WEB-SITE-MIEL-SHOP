/*
  Warnings:

  - Made the column `special_label` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `special_label` ENUM('none', 'most_sold', 'new') NOT NULL DEFAULT 'none';
