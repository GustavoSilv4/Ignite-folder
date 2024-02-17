/*
  Warnings:

  - You are about to drop the column `responsaible_person` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `responsible_person` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "responsaible_person",
ADD COLUMN     "responsible_person" TEXT NOT NULL;
