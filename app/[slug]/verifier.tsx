"use client";

import { PropsWithChildren } from "react";

// todo
export default function Verifier({
  children,
}: PropsWithChildren & { isProtected: boolean; pasteId: string }) {
  return <div>{children}</div>;
}
