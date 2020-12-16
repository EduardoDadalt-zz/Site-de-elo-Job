-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "UserNameLol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Elojob" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eloAtual" INTEGER NOT NULL,
    "eloRequerido" INTEGER NOT NULL,
    "creatDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    "authorID" INTEGER NOT NULL,

    FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.uid_unique" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Elojob_authorID_unique" ON "Elojob"("authorID");
