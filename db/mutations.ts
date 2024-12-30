import { db } from "@/db/client";
import {
  adventuresTable,
  memoriesTable,
  Memory,
  type Adventure,
} from "@/db/schema";

export async function addAdventure(adventure: Adventure) {
  if (!adventure.timestamp && !adventure.timestamp) return;
  db.insert(adventuresTable).values(adventure).run();
}

export async function addMemory(memory: Memory) {
  if (!memory.timestamp && !memory.memory) return;
  db.insert(memoriesTable).values(memory).run();
}
