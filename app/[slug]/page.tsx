import { getPasteWithId } from "@/actions/paste";
import { notFound } from "next/navigation";

type PageParam = {
  params: { slug: string };
};

export default async function ViewMarkdownPage({ params }: PageParam) {
  const data = await getPasteWithId(params.slug);
  if (!data) notFound();

  return <div>View Markdown page</div>;
}
