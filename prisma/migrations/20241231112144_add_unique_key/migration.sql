/*
  Warnings:

  - A unique constraint covering the columns `[date,userId]` on the table `status_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "status_logs_date_userId_key" ON "status_logs"("date", "userId");
