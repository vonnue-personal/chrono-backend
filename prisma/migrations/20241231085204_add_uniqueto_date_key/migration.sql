/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `status_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "status_logs" ALTER COLUMN "date" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "status_logs_date_key" ON "status_logs"("date");
