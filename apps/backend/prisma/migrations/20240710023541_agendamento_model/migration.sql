-- CreateTable
CREATE TABLE "agendamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataNasc" DATETIME NOT NULL,
    "dataAgendamento" DATETIME NOT NULL,
    "statusAtendimento" BOOLEAN NOT NULL DEFAULT false
);
