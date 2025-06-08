/*
  Warnings:

  - The primary key for the `Booth` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_boothId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_boothId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_boothId_fkey";

-- AlterTable
ALTER TABLE "Booth" DROP CONSTRAINT "Booth_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Booth_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Booth_id_seq";

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "boothId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "boothId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "boothId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
