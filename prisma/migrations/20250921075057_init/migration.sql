-- CreateTable
CREATE TABLE "public"."poems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "tags" TEXT[],
    "author" TEXT,
    "dynasty" TEXT,
    "mode" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "poems_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "public"."authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dynasty" TEXT,
    "epithet" TEXT,
    "quote" TEXT,
    "avatar" TEXT,
    "intro" TEXT,
    "tags" TEXT[],

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."articles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "dynasty" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "abstract" TEXT,
    "content" TEXT,
    "img" TEXT,
    "tags" TEXT[],

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "public"."events" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "figure" TEXT,
    "importance" INTEGER NOT NULL DEFAULT 0,
    "data" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "stars_userId_poemId_idx" ON "public"."stars"("userId", "poemId");

-- CreateIndex
CREATE UNIQUE INDEX "stars_userId_poemId_key" ON "public"."stars"("userId", "poemId");

-- CreateIndex
CREATE UNIQUE INDEX "authors_name_key" ON "public"."authors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "articles_title_key" ON "public"."articles"("title");

-- AddForeignKey
ALTER TABLE "public"."check_ins" ADD CONSTRAINT "check_ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."check_ins" ADD CONSTRAINT "check_ins_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "public"."quotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stars" ADD CONSTRAINT "stars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stars" ADD CONSTRAINT "stars_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."poems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
