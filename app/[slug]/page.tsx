import { getPasteWithId } from "@/actions/paste";
import { notFound } from "next/navigation";
import Verifier from "./verifier";
import MarkdownViewer from "./viewer";
import { auth } from "@/auth";
import { CopyUrl, Delete } from "./operation";

type PageParam = {
  params: { slug: string };
};

export default async function ViewMarkdownPage({ params }: PageParam) {
  const data = await getPasteWithId(params.slug);
  const session = await auth();
  if (!data) notFound();

  return (
    <Verifier isProtected={!!data.password} pasteId={data.id}>
      <div className="max-w-[700px] py-5 mx-auto">
        <div className="flex items-center gap-3">
          <CopyUrl id={data.id} />
          {session?.user?.id == data.userId && <Delete id={data.id} />}
        </div>
        <div className="py-8 font-mono flex flex-col gap-2">
          <h2 className="text-3xl font-semibold">{data.title}</h2>
          <p className="pb-3">{data.publishedAt.toDateString()}</p>
          <MarkdownViewer content={data.markdown} />
        </div>
      </div>
    </Verifier>
  );
}
