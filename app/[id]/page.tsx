import { dbClient } from "@/drizzle/db";
import { PasteTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function View({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await dbClient
    .select()
    .from(PasteTable)
    .where(eq(PasteTable.paste, id));
  if (data.length == 0) notFound();
  const paste = data[0];
  return (
    <div className="flex justify-center min-h-screen py-6 sm:py-12">
      <div className="flex flex-col gap-12 max-w-3xl w-full px-4 md:px-10">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight">
                {paste.name}
              </h1>
              <p className="leading-none text-muted-foreground">
                Posted 2 hours ago
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="leading-7 prose dark:prose-invert max-w-full whitespace-pre">
            {paste.content}
          </div>
        </div>
      </div>
    </div>
  );
}
