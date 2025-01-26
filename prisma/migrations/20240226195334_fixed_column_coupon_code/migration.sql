/*
  Warnings:

  - Made the column `couponCode` on table `coupon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `coupon` MODIFY `couponCode` VARCHAR(50) NOT NULL;
