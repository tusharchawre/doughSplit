/*
  Warnings:

  - Added the required column `txnName` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "txnName" TEXT NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'INR',
ALTER COLUMN "description" DROP NOT NULL;
