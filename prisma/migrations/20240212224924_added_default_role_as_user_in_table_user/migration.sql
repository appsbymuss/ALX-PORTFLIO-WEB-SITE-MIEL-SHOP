-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
