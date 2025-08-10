/*
  Warnings:

  - You are about to drop the column `css` on the `Booth` table. All the data in the column will be lost.
  - You are about to drop the column `html` on the `Booth` table. All the data in the column will be lost.
  - You are about to drop the column `javascript` on the `Booth` table. All the data in the column will be lost.
  - Added the required column `type` to the `Booth` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BoothType" AS ENUM ('HTML_CSS_JS', 'REACT');

-- AlterTable
ALTER TABLE "Booth" DROP COLUMN "css",
DROP COLUMN "html",
DROP COLUMN "javascript",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "BoothType" NOT NULL,
ADD COLUMN     "url" TEXT;
