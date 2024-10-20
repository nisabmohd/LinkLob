"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { pasteTable, TPaste } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { compareSync, hashSync } from "bcryptjs";

const createNewPasteSchema = z.object({
  content: z.string(),
  title: z.string(),
  password: z
    .string()
    .min(6, "Password length should be 6 atleast")
    .max(16, "Password length exceeded")
    .optional(),
});

type createNewPasteParam = z.infer<typeof createNewPasteSchema>;

export async function createNewPaste(param: createNewPasteParam) {
  const session = await auth();
  const { error } = createNewPasteSchema.safeParse(param);
  if (error) return { success: false, error: error.message };
  const newRecord = await db
    .insert(pasteTable)
    .values({
      markdown: param.content,
      title: param.title,
      password: param.password ? hashSync(param.password) : undefined,
      userId: session?.user?.id ?? undefined,
    })
    .returning();
  if (!newRecord[0]) return { success: false, error: "Something went wrong" };
  return { success: true, id: newRecord[0].id };
}

export async function deletePasteWithId(id: string) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "unauthorized" };
  await db
    .delete(pasteTable)
    .where(and(eq(pasteTable.id, id), eq(pasteTable.userId, session.user.id!)));
  return { success: true };
}

export async function getPasteWithId(id: string): Promise<TPaste | undefined> {
  const paste = await db.select().from(pasteTable).where(eq(pasteTable.id, id));
  return paste[0];
}

export async function getAllPasteForUser(): Promise<TPaste[]> {
  const session = await auth();
  if (!session?.user) return [];
  const userPastes = db
    .select()
    .from(pasteTable)
    .where(eq(pasteTable.userId, session.user.id!));
  return userPastes;
}

export async function verifyPasswordForPaste(id: string, password: string) {
  const paste = (
    await db.select().from(pasteTable).where(eq(pasteTable.id, id))
  )[0];
  if (!paste) return { success: false, error: "No paste found" };
  if (!paste.password) return { success: false, error: "It is public" };
  const match = compareSync(password, paste.password);
  if (match) return { success: true };
  return { success: false, error: "Password didnt match" };
}
