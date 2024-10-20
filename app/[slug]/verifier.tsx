"use client";

import { PropsWithChildren } from "react";

// todo
export default function Verifier({
  children,
  isProtected,
}: PropsWithChildren & { isProtected: boolean; pasteId: string }) {
  if (isProtected) return "password de";
  return <div>{children}</div>;
}
