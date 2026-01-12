/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `MasterRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codePrefix]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codePrefix` to the `MasterObject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `MasterRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codePrefix` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FieldValidationType" ADD VALUE 'MIN';
ALTER TYPE "FieldValidationType" ADD VALUE 'MAX';
ALTER TYPE "FieldValidationType" ADD VALUE 'BETWEEN';
ALTER TYPE "FieldValidationType" ADD VALUE 'EMAIL';

-- AlterTable
ALTER TABLE "MasterObject" ADD COLUMN     "codePrefix" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MasterRecord" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "codePrefix" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MasterObjectCounter" (
    "masterObjectId" TEXT NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MasterObjectCounter_pkey" PRIMARY KEY ("masterObjectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterRecord_code_key" ON "MasterRecord"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_codePrefix_key" ON "Resource"("codePrefix");

-- AddForeignKey
ALTER TABLE "MasterObjectCounter" ADD CONSTRAINT "MasterObjectCounter_masterObjectId_fkey" FOREIGN KEY ("masterObjectId") REFERENCES "MasterObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
