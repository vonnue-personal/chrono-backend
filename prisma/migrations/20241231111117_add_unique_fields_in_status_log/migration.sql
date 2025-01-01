/*
  Warnings:

  - A unique constraint covering the columns `[date,id,userId]` on the table `status_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "status_logs_date_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "status_logs_date_id_userId_key" ON "status_logs"("date", "id", "userId");
