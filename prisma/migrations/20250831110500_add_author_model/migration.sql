-- CreateTable
CREATE TABLE "public"."authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dynasty" TEXT NOT NULL,
    "epithet" TEXT,
    "quote" TEXT,
    "avatar" TEXT,
    "intro" TEXT,
    "tags" TEXT[],
    "poem" TEXT[],

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authors_name_key" ON "public"."authors"("name");
