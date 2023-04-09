/*
  Warnings:

  - You are about to drop the column `user_id` on the `schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_user_id_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "Commitment" (
    "id" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "Commitment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Commitment" ADD CONSTRAINT "Commitment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commitment" ADD CONSTRAINT "Commitment_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
