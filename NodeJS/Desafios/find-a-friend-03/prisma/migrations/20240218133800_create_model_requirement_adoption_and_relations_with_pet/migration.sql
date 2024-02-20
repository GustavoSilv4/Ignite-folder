/*
  Warnings:

  - You are about to drop the column `requirements_adoption` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "requirements_adoption";

-- CreateTable
CREATE TABLE "requirementsAdoption" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "petId" TEXT,

    CONSTRAINT "requirementsAdoption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requirementsAdoption" ADD CONSTRAINT "requirementsAdoption_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
