/*
  Warnings:

  - You are about to drop the column `poem` on the `authors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."authors" DROP COLUMN "poem";

-- CreateTable
CREATE TABLE "public"."articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "dynasty" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "abstract" TEXT NOT NULL,
    "img" TEXT,
    "tags" TEXT[],

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_title_key" ON "public"."articles"("title");
