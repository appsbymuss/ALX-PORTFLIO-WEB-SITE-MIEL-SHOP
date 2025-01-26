-- CreateTable
CREATE TABLE `payment` (
    `paymentIntent` VARCHAR(191) NOT NULL,
    `amountTotal` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `paymentStatus` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_order_id_key`(`order_id`),
    PRIMARY KEY (`paymentIntent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
