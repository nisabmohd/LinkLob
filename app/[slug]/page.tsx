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
        <div className="py-8 font-mono flex flex-col gap-3">
          <h2 className="sm:text-3xl text-2xl font-semibold">{data.title}</h2>
          <p className="text-sm">
            Created on: {data.publishedAt.toDateString()}
          </p>
          <div className="flex items-center gap-3 pb-3 pt-1">
            {session?.user?.id == data.userId && (
              <>
                <CopyUrl id={data.id} />
                <Delete id={data.id} />
              </>
            )}
          </div>
          <MarkdownViewer content={data.markdown} />
        </div>
      </div>
    </Verifier>
  );
}
