/*
  Warnings:

  - You are about to alter the column `duration` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `totalDuration` on the `status_logs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "duration" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "status_logs" ALTER COLUMN "totalDuration" SET DATA TYPE INTEGER;
