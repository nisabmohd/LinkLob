import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { signInAction, signOutAction } from "@/actions/auth";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="flex h-16 items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        LinkLob
      </Link>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {session?.user ? (
          <LoggedInUser />
        ) : (
          <form action={signInAction}>
            <Button size="sm" variant="link" type="submit">
              Signin
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

async function LoggedInUser() {
  const session = await auth();
  if (!session?.user) return null;
  return (
    <div className="flex items-center -space-x-2">
      <Link className={buttonVariants({ variant: "link" })} href="/profile">
        Profile
      </Link>
      <form action={signOutAction}>
        <Button className={buttonVariants({ variant: "link" })}>Signout</Button>
      </form>
    </div>
  );
}
