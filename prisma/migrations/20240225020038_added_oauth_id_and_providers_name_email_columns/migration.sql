/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oauthId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `email` VARCHAR(191),
    ADD COLUMN `oauthId` VARCHAR(191) NULL,
    ADD COLUMN `oauthProvider` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `user_oauthId_key` ON `user`(`oauthId`);
