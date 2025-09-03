/*
  Warnings:

  - You are about to drop the `Star` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Star" DROP CONSTRAINT "Star_poemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Star" DROP CONSTRAINT "Star_userId_fkey";

-- DropTable
DROP TABLE "public"."Star";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "poemId" TEXT NOT NULL,

    CONSTRAINT "stars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stars_userId_idx" ON "public"."stars"("userId");

-- CreateIndex
CREATE INDEX "stars_poemId_idx" ON "public"."stars"("poemId");

-- CreateIndex
CREATE UNIQUE INDEX "stars_userId_poemId_key" ON "public"."stars"("userId", "poemId");

-- AddForeignKey
ALTER TABLE "public"."stars" ADD CONSTRAINT "stars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stars" ADD CONSTRAINT "stars_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."poems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
