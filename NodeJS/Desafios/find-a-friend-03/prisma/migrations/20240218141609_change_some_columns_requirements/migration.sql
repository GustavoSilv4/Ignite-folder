/*
  Warnings:

  - Made the column `petId` on table `petImages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `petId` on table `requirementsAdoption` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "petImages" DROP CONSTRAINT "petImages_petId_fkey";

-- DropForeignKey
ALTER TABLE "requirementsAdoption" DROP CONSTRAINT "requirementsAdoption_petId_fkey";

-- AlterTable
ALTER TABLE "petImages" ALTER COLUMN "petId" SET NOT NULL;

-- AlterTable
ALTER TABLE "requirementsAdoption" ALTER COLUMN "petId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "requirementsAdoption" ADD CONSTRAINT "requirementsAdoption_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petImages" ADD CONSTRAINT "petImages_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
