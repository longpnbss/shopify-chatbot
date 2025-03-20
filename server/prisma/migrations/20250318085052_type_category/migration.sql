/*
  Warnings:

  - The `category` column on the `Chatbot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('GENERAL', 'RETURN', 'SHIPPING', 'PAYMENT');

-- AlterTable
ALTER TABLE "Chatbot" DROP COLUMN "category",
ADD COLUMN     "category" "CategoryType" NOT NULL DEFAULT 'GENERAL';
