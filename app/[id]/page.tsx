import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProtectedPaste from "@/components/protected-paste";
import { getPaste } from "@/actions/paste";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { Suspense } from "react";

export default async function View({
  params: { id },
}: {
  params: { id: string };
}) {
  const paste = await getPaste(id);
  if (!paste) notFound();
  return (
    <div className="flex justify-center min-h-screen py-6 sm:py-12">
      <div className="flex flex-col gap-12 max-w-3xl w-full px-4 md:px-10">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-2">
              <Link
                href="/"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "-ml-5 mb-2",
                })}
              >
                <ChevronLeftIcon className="w-5 h-5 mr-1" /> Back to homepage
              </Link>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {paste.name}
              </h1>
              <p className="leading-none text-muted-foreground">
                Paste created - {timeAgo(paste.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="leading-7 prose prose-slate dark:prose-invert max-w-full prose-code:font-code dark:prose-code:bg-neutral-900 dark:prose-pre:bg-neutral-900">
            <Suspense fallback="Loading...">
              <ProtectedPaste isProtected={!!paste.password} id={paste.id}>
                <MDXRemote source={paste.content} />
              </ProtectedPaste>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
