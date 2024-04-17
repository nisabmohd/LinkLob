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

  if (!isMounted) return null;
  if (!unlocked)
    return (
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              The content you are trying to access is locked.
            </DialogTitle>
            <DialogDescription>
              Please enter the password to view the paste.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <Input
              value={inputpassword}
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
              onClick={() => {
                startTransition(async () => {
                  const isCorrect = await verify(id, inputpassword);
                  if (isCorrect) {
                    setUnlocked(true);
                    setEnteredWrongPassword(false);
                    return;
                  }
                  setEnteredWrongPassword(true);
                });
              }}
              disabled={!inputpassword}
            >
              {pending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Verify
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  return <Fragment>{children}</Fragment>;
}
