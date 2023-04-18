/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "schedules_nome_key" ON "schedules"("nome");
