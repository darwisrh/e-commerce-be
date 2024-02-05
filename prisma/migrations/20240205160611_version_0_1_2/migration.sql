/*
  Warnings:

  - You are about to drop the column `closed_at` on the `shops` table. All the data in the column will be lost.
  - You are about to drop the column `opened_at` on the `shops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shops" DROP COLUMN "closed_at",
DROP COLUMN "opened_at";
