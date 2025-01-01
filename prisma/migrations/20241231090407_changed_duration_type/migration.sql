/*
  Warnings:

  - Changed the type of `duration` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `totalDuration` on the `status_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "duration",
ADD COLUMN     "duration" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "status_logs" DROP COLUMN "totalDuration",
ADD COLUMN     "totalDuration" DECIMAL(65,30) NOT NULL;
