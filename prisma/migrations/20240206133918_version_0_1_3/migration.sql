/*
  Warnings:

  - Added the required column `quantity` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "total" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE BIGINT,
ALTER COLUMN "cashback" SET DATA TYPE BIGINT,
ALTER COLUMN "cashback_total" SET DATA TYPE BIGINT;
