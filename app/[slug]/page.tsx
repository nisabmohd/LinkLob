import { getPasteWithId } from "@/actions/paste";
import { notFound } from "next/navigation";
import Verifier from "./verifier";

type PageParam = {
  params: { slug: string };
};

// todo
export default async function ViewMarkdownPage({ params }: PageParam) {
  const data = await getPasteWithId(params.slug);
  if (!data) notFound();

  return (
    <Verifier isProtected={!!data.password} pasteId={data.id}>
      {data.markdown}
    </Verifier>
  );
}
