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
CREATE TABLE "public"."check_ins" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "poemId" TEXT NOT NULL,

    CONSTRAINT "stars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quotes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "dynasty" TEXT,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "check_ins_userId_idx" ON "public"."check_ins"("userId");

-- CreateIndex
CREATE INDEX "check_ins_date_idx" ON "public"."check_ins"("date");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_userId_date_key" ON "public"."check_ins"("userId", "date");

-- CreateIndex
CREATE INDEX "stars_userId_idx" ON "public"."stars"("userId");

-- CreateIndex
CREATE INDEX "stars_poemId_idx" ON "public"."stars"("poemId");

-- CreateIndex
CREATE UNIQUE INDEX "stars_userId_poemId_key" ON "public"."stars"("userId", "poemId");

-- AddForeignKey
ALTER TABLE "public"."check_ins" ADD CONSTRAINT "check_ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."check_ins" ADD CONSTRAINT "check_ins_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "public"."quotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stars" ADD CONSTRAINT "stars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stars" ADD CONSTRAINT "stars_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."poems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
