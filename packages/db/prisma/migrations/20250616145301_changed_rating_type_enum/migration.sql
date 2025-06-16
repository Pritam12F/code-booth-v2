/*
  Warnings:

  - The values [ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,TEN] on the enum `RatingType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RatingType_new" AS ENUM ('One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten');
ALTER TABLE "Rating" ALTER COLUMN "content" TYPE "RatingType_new" USING ("content"::text::"RatingType_new");
ALTER TYPE "RatingType" RENAME TO "RatingType_old";
ALTER TYPE "RatingType_new" RENAME TO "RatingType";
DROP TYPE "RatingType_old";
COMMIT;
