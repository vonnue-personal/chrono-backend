/*
  Warnings:

  - Added the required column `logId` to the `activity_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity_records" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "logId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "activity_records" ADD CONSTRAINT "activity_records_logId_fkey" FOREIGN KEY ("logId") REFERENCES "status_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
