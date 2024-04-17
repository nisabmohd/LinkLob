"use client";

import { ComponentPropsWithRef } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

type SubmitButtonProps = ComponentPropsWithRef<typeof Button>;

export default function Submit({ children, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button {...rest} disabled={pending}>
      {pending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
