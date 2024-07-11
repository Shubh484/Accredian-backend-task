-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "yourName" TEXT NOT NULL,
    "yourEmail" TEXT NOT NULL,
    "friendName" TEXT NOT NULL,
    "friendEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);
