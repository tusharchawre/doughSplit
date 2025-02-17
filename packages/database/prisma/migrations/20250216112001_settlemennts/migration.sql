/*
  Warnings:

  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `_TransactionToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TransactionToUser" DROP CONSTRAINT "_TransactionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionToUser" DROP CONSTRAINT "_TransactionToUser_B_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "settledStatus" "TransactionStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "_TransactionToUser";

-- CreateTable
CREATE TABLE "Settlement" (
    "id" TEXT NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "paidById" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "settledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TransactionParticipants" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TransactionParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TransactionParticipants_B_index" ON "_TransactionParticipants"("B");

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_paidById_fkey" FOREIGN KEY ("paidById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionParticipants" ADD CONSTRAINT "_TransactionParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionParticipants" ADD CONSTRAINT "_TransactionParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
