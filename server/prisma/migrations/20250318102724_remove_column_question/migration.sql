/*
  Warnings:

  - You are about to drop the column `question` on the `Chatbot` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Chatbot_question_key";

-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "question";
