/*
  Warnings:

  - You are about to drop the column `date_time` on the `Commitment` table. All the data in the column will be lost.
  - Added the required column `end_date_time` to the `Commitment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date_time` to the `Commitment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commitment" DROP COLUMN "date_time",
ADD COLUMN     "end_date_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date_time" TIMESTAMP(3) NOT NULL;
