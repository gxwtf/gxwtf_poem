-- AlterTable
ALTER TABLE "public"."articles" ADD COLUMN     "content" TEXT,
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "dynasty" DROP NOT NULL,
ALTER COLUMN "abstract" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."authors" ALTER COLUMN "dynasty" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."poems" ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "dynasty" DROP NOT NULL;
