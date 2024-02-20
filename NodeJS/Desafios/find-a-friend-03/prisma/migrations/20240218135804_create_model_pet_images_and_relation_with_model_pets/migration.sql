/*
  Warnings:

  - You are about to drop the column `image` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "petImages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "petId" TEXT,

    CONSTRAINT "petImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "petImages" ADD CONSTRAINT "petImages_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
