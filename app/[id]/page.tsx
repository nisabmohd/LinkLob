import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPaste } from "@/actions/paste";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { cache } from "react";
import remarkGfm from "remark-gfm";
import Verifier from "@/components/verify";

//  removing isr

// export const dynamic = "force-static",
//   dynamicParams = true;

// export function generateStaticParams() {
//   return [];
// }

const cachedGetPasteFn = cache(getPaste);

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: PageProps) {
  const paste = await cachedGetPasteFn(id);
  if (!paste) return null;
  return {
    title: paste.name.slice(0, 20) + "...",
  };
}

export default async function View({ params: { id } }: PageProps) {
  const paste = await cachedGetPasteFn(id);
  if (!paste) notFound();
  return (
    <div className="flex justify-center min-h-screen py-6 sm:py-12">
      <div className="flex flex-col gap-6 max-w-3xl w-full px-4 md:px-10">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-2">
              <Link
                href="/"
                className={buttonVariants({
                  variant: "link",
                  className: "sm:-ml-5 -ml-3.5 mb-5 text-base",
                })}
              >
                <ChevronLeftIcon className="w-5 h-5 mr-2" /> Back to homepage
              </Link>
              <h1 className="text-3xl w-[95%] sm:w-full font-extrabold tracking-tight">
                {paste.name}
              </h1>
              <p className="leading-none text-muted-foreground">
                Paste created - {timeAgo(paste.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="leading-7 prose prose-slate dark:prose-invert max-w-full prose-code:font-code dark:prose-code:bg-neutral-900 dark:prose-pre:bg-neutral-900 break-words">
            <Verifier isProtected={!!paste.password} id={paste.id}>
              <MDXRemote
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
                source={paste.content}
              />
            </Verifier>
          </div>
        </div>
      </div>
    </div>
  );
}
