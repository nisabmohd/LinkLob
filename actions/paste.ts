"use server";

import { dbClient } from "@/drizzle/db";
import { PasteTable } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { z } from "zod";
import { hash as hashAsync, compare as compareAsync } from "bcryptjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const newPasteSchema = z.object({
  content: z.string(),
  password: z.string().optional(),
  title: z.string(),
});

export async function create(formData: FormData) {
  const result = newPasteSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return null;
  const {
    data: { content, title, password },
  } = result;
  const hash = password && (await hashAsync(password, 8));
  const data = await dbClient
    .insert(PasteTable)
    .values({
      content: content,
      name: title,
      password: hash,
    })
    .returning();
  const createdPaste = data[0];
  revalidatePath(`/${createdPaste.id}`);
  redirect(`/${createdPaste.id}`);
}

export async function verify(id: string, password: string) {
  const paste = await getPaste(id);
  if (!paste) return false;
  const isCorrect = await compareAsync(password, paste.password!);
  return isCorrect;
}

export async function getPaste(id: string) {
  const data = await dbClient
    .select()
    .from(PasteTable)
    .where(eq(PasteTable.id, id));
  if (data.length == 0) return null;
  return data[0];
}
