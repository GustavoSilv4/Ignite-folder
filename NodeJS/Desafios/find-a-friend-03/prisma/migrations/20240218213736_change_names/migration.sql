/*
  Warnings:

  - You are about to drop the column `petId` on the `petImages` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `requirementsAdoption` table. All the data in the column will be lost.
  - Added the required column `pet_id` to the `petImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `requirementsAdoption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "petImages" DROP CONSTRAINT "petImages_petId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- DropForeignKey
ALTER TABLE "requirementsAdoption" DROP CONSTRAINT "requirementsAdoption_petId_fkey";

-- AlterTable
ALTER TABLE "petImages" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "orgId",
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "requirementsAdoption" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirementsAdoption" ADD CONSTRAINT "requirementsAdoption_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petImages" ADD CONSTRAINT "petImages_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
