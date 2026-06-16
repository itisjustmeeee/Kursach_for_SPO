-- AlterTable
ALTER TABLE "document_loans" ALTER COLUMN "issued_by" DROP NOT NULL,
ALTER COLUMN "due_date" DROP NOT NULL;
