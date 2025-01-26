-- AlterTable
ALTER TABLE `user` ADD COLUMN `forget_password_maxAge` DATETIME(3) NULL,
    ADD COLUMN `forget_password_token` VARCHAR(191) NULL;
