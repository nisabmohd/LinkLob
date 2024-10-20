"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState, useTransition } from "react";
import rehypeSanitize from "rehype-sanitize";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { createNewPaste } from "@/actions/paste";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircleIcon } from "lucide-react";

export default function Editor() {
  const [markdownValue, setMarkdownValue] = useState<string | undefined>(
    "**Hello world!!!**"
  );
  const [otherInputs, setOtherInputs] = useState({
    title: "",
    password: "",
  });
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { toast } = useToast();
  const [pending, transitionFn] = useTransition();

  async function handleSubmit() {
    const { password, title } = otherInputs;
    if (!markdownValue || !title) return;

    transitionFn(async () => {
      const createdPaste = await createNewPaste({
        content: markdownValue,
        title,
        password: password || undefined,
      });
      if (!createdPaste.success) {
        toast({
          title: "Failed to create paste",
          description: createdPaste.error,
        });
      } else {
        router.push(`/${createdPaste.id}`);
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      data-color-mode={resolvedTheme}
      className="w-[800px] flex flex-col gap-4"
    >
      <div className="h-[250px]">
        <MDEditor
          height="100%"
          value={markdownValue}
          onChange={setMarkdownValue}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-1">
        <Input
          value={otherInputs.title}
          onChange={(e) =>
            setOtherInputs((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Title for the paste"
          required
        />
        <Input
          value={otherInputs.password}
          onChange={(e) =>
            setOtherInputs((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Password if required"
          type="password"
        />
      </div>
      <Button disabled={!otherInputs.title || !markdownValue || pending}>
        {pending && <LoaderCircleIcon className="animate-spin mr-2 w-5 h-5" />}
        Generate URL
      </Button>
    </form>
  );
}
