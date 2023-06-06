/*
  Warnings:

  - You are about to drop the `Commitment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commitment" DROP CONSTRAINT "Commitment_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Commitment" DROP CONSTRAINT "Commitment_schedule_id_fkey";

-- DropTable
DROP TABLE "Commitment";

-- CreateTable
CREATE TABLE "commitments" (
    "id" TEXT NOT NULL,
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "end_date_time" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "commitments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commitments" ADD CONSTRAINT "commitments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commitments" ADD CONSTRAINT "commitments_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
