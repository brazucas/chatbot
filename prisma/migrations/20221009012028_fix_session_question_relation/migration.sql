/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `QuestionLog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currentQuestionId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `QuestionLog` DROP FOREIGN KEY `QuestionLog_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `QuestionLog` DROP FOREIGN KEY `QuestionLog_sessionId_fkey`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `sessionId`;

-- AlterTable
ALTER TABLE `Session` ADD COLUMN `currentQuestionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `QuestionLog`;

-- CreateTable
CREATE TABLE `SessionQuestionLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `questionId` INTEGER NOT NULL,
    `sessionId` INTEGER NOT NULL,
    `httpRequestUrl` VARCHAR(128) NULL,
    `httpResponseCode` INTEGER NULL,
    `httpResponseBody` LONGTEXT NULL,
    `httpResponseHeaders` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_currentQuestionId_fkey` FOREIGN KEY (`currentQuestionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionQuestionLog` ADD CONSTRAINT `SessionQuestionLog_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionQuestionLog` ADD CONSTRAINT `SessionQuestionLog_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
