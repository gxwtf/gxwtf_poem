-- CreateTable
CREATE TABLE "public"."User" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Star" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "poemId" TEXT NOT NULL,

    CONSTRAINT "Star_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Star_userId_idx" ON "public"."Star"("userId");

-- CreateIndex
CREATE INDEX "Star_poemId_idx" ON "public"."Star"("poemId");

-- CreateIndex
CREATE UNIQUE INDEX "Star_userId_poemId_key" ON "public"."Star"("userId", "poemId");

-- AddForeignKey
ALTER TABLE "public"."Star" ADD CONSTRAINT "Star_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Star" ADD CONSTRAINT "Star_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."poems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
