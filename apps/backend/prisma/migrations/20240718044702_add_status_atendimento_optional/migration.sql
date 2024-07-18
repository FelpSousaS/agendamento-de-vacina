-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_agendamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataNasc" DATETIME NOT NULL,
    "dataAgendamento" DATETIME NOT NULL,
    "statusAtendimento" BOOLEAN DEFAULT false
);
INSERT INTO "new_agendamentos" ("dataAgendamento", "dataNasc", "id", "nome", "statusAtendimento") SELECT "dataAgendamento", "dataNasc", "id", "nome", "statusAtendimento" FROM "agendamentos";
DROP TABLE "agendamentos";
ALTER TABLE "new_agendamentos" RENAME TO "agendamentos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
