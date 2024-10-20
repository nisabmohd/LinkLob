import Editor from "@/components/editor";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex items-center flex-col h-[85vh] py-8 gap-6 justify-center pt-14 w-full">
      <div className="flex items-center flex-col gap-4 text-center">
        <h2 className="sm:text-5xl text-3xl font-extrabold">
          LinkLob: Paste your content
        </h2>
        <p className="sm:text-lg text-base max-w-[700px] font-medium">
          Share code, notes, and text with others. The content you paste here is
          public and accessible via a unique URL.
        </p>
      </div>
      <div id="paste" className="pt-1">
        <Suspense fallback="Loading editor...">
          <Editor />
        </Suspense>
      </div>
    </div>
  );
}
