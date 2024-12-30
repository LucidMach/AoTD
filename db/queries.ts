import { db } from "@/db/client";
import { adventuresTable, memoriesTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export function getAllAdventures() {
  return db
    .select()
    .from(adventuresTable)
    .orderBy(desc(adventuresTable.timestamp));
}

export function getAllMemories() {
  return db.select().from(memoriesTable).orderBy(desc(memoriesTable.timestamp));
}
