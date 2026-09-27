-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "emoji" TEXT,
    "priceTon" DECIMAL(20,9) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LISTED',
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
