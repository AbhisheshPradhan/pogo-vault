-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "nid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speciesName" TEXT NOT NULL,
    "formName" TEXT,
    "dexNum" INTEGER NOT NULL,
    "formId" TEXT,
    "region" TEXT NOT NULL,
    "gen" INTEGER NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT,
    "color" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "isForm" BOOLEAN NOT NULL,
    "isLegendary" BOOLEAN NOT NULL,
    "isMythical" BOOLEAN NOT NULL,
    "isUltraBeast" BOOLEAN NOT NULL,
    "ultraBeastCode" TEXT,
    "isSpecialAbilityForm" BOOLEAN NOT NULL,
    "isCosmeticForm" BOOLEAN NOT NULL,
    "isFemaleForm" BOOLEAN NOT NULL,
    "hasGenderDifferences" BOOLEAN NOT NULL,
    "isBattleOnlyForm" BOOLEAN NOT NULL,
    "isSwitchableForm" BOOLEAN NOT NULL,
    "isFusion" BOOLEAN NOT NULL,
    "fusedWith" TEXT,
    "isMega" BOOLEAN NOT NULL,
    "isPrimal" BOOLEAN NOT NULL,
    "isGmax" BOOLEAN NOT NULL,
    "isRegional" BOOLEAN NOT NULL,
    "eventExclusive" BOOLEAN NOT NULL,
    "debutIn" TEXT NOT NULL,
    "shinyReleased" BOOLEAN NOT NULL,
    "shadowReleased" BOOLEAN NOT NULL,
    "baseSpecies" TEXT,
    "evolvesFrom" JSONB,
    "isShiny" BOOLEAN NOT NULL,
    "isShadow" BOOLEAN NOT NULL,
    "availableInPogo" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL,
    "filters" JSONB NOT NULL DEFAULT '[]',
    "pokemonCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCatchState" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "isCaught" BOOLEAN NOT NULL,

    CONSTRAINT "UserCatchState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionProgress" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "caughtCount" INTEGER NOT NULL,
    "totalCount" INTEGER NOT NULL,

    CONSTRAINT "CollectionProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_id_key" ON "Pokemon"("id");

-- CreateIndex
CREATE INDEX "Pokemon_dexNum_idx" ON "Pokemon"("dexNum");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE INDEX "Collection_slug_idx" ON "Collection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCatchState_userId_pokemonId_key" ON "UserCatchState"("userId", "pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionProgress_collectionId_userId_key" ON "CollectionProgress"("collectionId", "userId");

-- AddForeignKey
ALTER TABLE "UserCatchState" ADD CONSTRAINT "UserCatchState_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCatchState" ADD CONSTRAINT "UserCatchState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionProgress" ADD CONSTRAINT "CollectionProgress_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionProgress" ADD CONSTRAINT "CollectionProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
