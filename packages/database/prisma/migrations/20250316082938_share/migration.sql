-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "settledAt" TIMESTAMP(3),

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Share_id_key" ON "Share"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Share_transactionId_userId_key" ON "Share"("transactionId", "userId");

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
