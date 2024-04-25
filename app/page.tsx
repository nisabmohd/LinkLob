import { create } from "@/actions/paste";
import Submit from "@/components/submit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex items-center justify-center py-6 sm:py-12">
      <div className="grid max-w-3xl w-full gap-2 px-4 md:px-10">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            LinkLob: Paste your content
          </h1>
          <p className="text-gray-500 md:w-[80%] dark:text-gray-400">
            Share code, notes, and text with others. The content you paste here
            is public and accessible via a unique URL.
          </p>
        </div>
        <form action={create} className="grid gap-4">
          <Textarea
            className="rounded-md border p-4 mt-2 h-80 w-full"
            spellCheck="false"
            placeholder="Paste your markdown content here."
            name="content"
            required
          />
          <Input
            className="rounded-md border p-4"
            placeholder="Title for your paste"
            type="text"
            name="title"
            required
          />
          <Input
            className="rounded-md border p-4"
            placeholder="Password to protect paste (optional)"
            name="password"
            type="password"
          />
          <div className="grid gap-2 text-sm">
            <p className="text-xs text-gray-500">
              Your paste&apos;s URL:
              <Link className="underline underline-offset-2" href="#">
                {process.env.HOSTED_URL}/unique-url
              </Link>
            </p>
            <Submit className="w-full mt-4" type="submit">
              Create Paste
            </Submit>
          </div>
        </form>
      </div>
    </div>
  );
}
