/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `SessionTrigger` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_triggerId_fkey`;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `parentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `QuestionAction` ADD COLUMN `requestHeaders` JSON NULL,
    ADD COLUMN `requestMethod` ENUM('GET', 'POST', 'PUT', 'DELETE') NULL,
    ADD COLUMN `requestPayload` JSON NULL,
    ADD COLUMN `requestUrl` VARCHAR(128) NULL;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `triggerId`,
    ADD COLUMN `chatId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `SessionTrigger`;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
