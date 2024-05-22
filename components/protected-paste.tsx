"use client";

import { Fragment, PropsWithChildren, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { verify } from "@/actions/paste";
import { Loader2Icon } from "lucide-react";
import useMounted from "@/hooks/useMounted";

export default function ProtectedPaste({
  children,
  isProtected,
  id,
}: PropsWithChildren & {
  isProtected: boolean;
  id: string;
}) {
  const [unlocked, setUnlocked] = useState(!isProtected);
  const [inputpassword, setInputPassword] = useState("");
  const [pending, startTransition] = useTransition();
  const [enteredWrongPassword, setEnteredWrongPassword] = useState(false);
  const isMounted = useMounted();

  function handlePasswordCheck() {
    startTransition(async () => {
      const isCorrect = await verify(id, inputpassword);
      if (isCorrect) {
        setUnlocked(true);
        setEnteredWrongPassword(false);
        return;
      }
      setEnteredWrongPassword(true);
    });
  }

  if (!isMounted) return null;
  if (!unlocked)
    return (
      <>
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-left leading-6">
                The content you are trying to access is locked.
              </DialogTitle>
              <DialogDescription className="text-left">
                Please enter the password to view the paste.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              <Input
                value={inputpassword}
                onKeyDown={(e) => e.keyCode == 13 && handlePasswordCheck()}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="Enter password"
                type="password"
              />
              {enteredWrongPassword && (
                <span className="text-sm text-red-400">
                  The password you entered seems incorrect!
                </span>
              )}
              <Button
                className="mt-4"
                onClick={handlePasswordCheck}
                disabled={!inputpassword || pending}
              >
                {pending && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <BlurredPlaceholder />
      </>
    );
  return <Fragment>{children}</Fragment>;
}

function BlurredPlaceholder() {
  return (
    <div className="blur-[5px]">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        doloremque ad tempora dolorem veritatis illo similique qui, voluptatem
        nemo, nulla nisi aspernatur vero laboriosam voluptatibus in
        reprehenderit placeat doloribus mollitia, reiciendis excepturi eius
        fugit eos explicabo? Voluptatibus ad at minus similique doloribus
        facilis tempora exercitationem reprehender
      </p>
      <p>
        sint autem est fugiat sit sequi! Natus pariatur dolore quae, quod quidem
        error vero alias ut, ex fugiat debitis ea facere? Nobis facilis
        dignissimos odio soluta. Sint rem magnam itaque est quia, atque
        distinctio assumenda esse. eos? Dolores ex error, saepe dolore, neque
        corporis maxime, quas ad cum a voluptates!
      </p>
    </div>
  );
}
