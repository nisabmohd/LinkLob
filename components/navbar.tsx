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
      <div className="flex items-center sm:gap-2 -space-x-1.5">
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
    <div className="flex items-center sm:-space-x-2 -space-x-5">
      <Link className={buttonVariants({ variant: "link" })} href="/profile">
        Profile
      </Link>
      <form action={signOutAction}>
        <button className={buttonVariants({ variant: "link" })}>Signout</button>
      </form>
    </div>
  );
}
