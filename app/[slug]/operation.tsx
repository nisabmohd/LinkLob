"use client";

import { deletePasteWithId } from "@/actions/paste";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Delete({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, transitionFn] = useTransition();
  async function handleDelete() {
    transitionFn(async () => {
      const { success } = await deletePasteWithId(id);
      if (success) {
        router.push("/");
        toast({
          title: "Deleted successfully",
        });
      }
    });
  }
  return (
    <form action={handleDelete}>
      <Button disabled={pending} type="submit">
        {pending && <LoaderCircleIcon className="animate-spin mr-2 w-5 h-5" />}
        Delete Paste
      </Button>
    </form>
  );
}

export function CopyUrl({ id }: { id: string }) {
  const { toast } = useToast();
  function handleCopy() {
    const deployedURL = process.env.NEXT_PUBLIC_DEPLOYED_URL!;
    const url = `${deployedURL}/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Copied to clipboard",
        description: url,
      });
    });
  }
  return <Button onClick={handleCopy}>Copy URL</Button>;
}
