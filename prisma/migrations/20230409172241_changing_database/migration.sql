/*
  Warnings:

  - Made the column `sobre` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_perfil` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link_google` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email_contato` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome_contato` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cidade` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rua` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `schedules` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cidade` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rua` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nascimento` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "sobre" SET NOT NULL,
ALTER COLUMN "img_perfil" SET NOT NULL,
ALTER COLUMN "link_google" SET NOT NULL,
ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "email_contato" SET NOT NULL,
ALTER COLUMN "nome_contato" SET NOT NULL,
ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "estado" SET NOT NULL,
ALTER COLUMN "cidade" SET NOT NULL,
ALTER COLUMN "rua" SET NOT NULL,
ALTER COLUMN "numero" SET NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "descricao" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "estado" SET NOT NULL,
ALTER COLUMN "cidade" SET NOT NULL,
ALTER COLUMN "rua" SET NOT NULL,
ALTER COLUMN "numero" SET NOT NULL,
ALTER COLUMN "nascimento" SET NOT NULL;
