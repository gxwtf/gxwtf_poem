-- CreateTable
CREATE TABLE "public"."poems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "tags" TEXT[],
    "author" TEXT NOT NULL,
    "dynasty" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "poems_pkey" PRIMARY KEY ("id")
);
