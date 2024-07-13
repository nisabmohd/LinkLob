"use client";

import { PropsWithChildren, useState, useTransition } from "react";
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

export default function Verifier({
  children,
  isProtected,
  id,
}: PropsWithChildren & {
  isProtected: boolean;
  id: string;
}) {
  const [verified, setVerifed] = useState(!isProtected);
  const isMounted = useMounted();

  if (!isMounted) return "Loading....";
  if (!verified) return <VerifyDialog cb={setVerifed} id={id} />;
  return <div>{children}</div>;
}

function VerifyDialog({ cb, id }: { cb: (val: boolean) => void; id: string }) {
  const [inputpassword, setInputPassword] = useState("");
  const [pending, startTransition] = useTransition();
  const [enteredWrongPassword, setEnteredWrongPassword] = useState(false);

  function handlePasswordCheck() {
    startTransition(async () => {
      const isCorrect = await verify(id, inputpassword);
      if (isCorrect) {
        cb(true);
        setEnteredWrongPassword(false);
        return;
      }
      setEnteredWrongPassword(true);
    });
  }

  return (
    <>
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left leading-6">
              Password Required
            </DialogTitle>
            <DialogDescription className="text-left">
              This content is protected. Please enter the password to proceed.
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
              {pending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Verify
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <BlurredPlaceholder />
    </>
  );
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
