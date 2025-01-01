/*
  Warnings:

  - A unique constraint covering the columns `[date,id]` on the table `status_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_logId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "status_logs_date_id_key" ON "status_logs"("date", "id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_logId_fkey" FOREIGN KEY ("logId") REFERENCES "status_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
