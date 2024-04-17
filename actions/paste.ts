"use server";

import { dbClient } from "@/drizzle/db";
import { PasteTable } from "@/drizzle/schema";
import { redirect } from "next/navigation";

export async function create(formData: FormData) {
  const data = await dbClient
    .insert(PasteTable)
    .values({
      content: formData.get("content") as string,
      name: formData.get("title") as string,
      password: (formData.get("password") as string) ?? null,
    })
    .returning();
  const createdPaste = data[0];
  redirect(`/${createdPaste.id}`);
}
