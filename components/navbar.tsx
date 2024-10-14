import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { signInAction, signOutAction } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="flex h-16 items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        LinkLob
      </Link>
      <div className="flex items-center">
        <ModeToggle />
        <Link
          href="/new"
          className={buttonVariants({
            className: "font-medium ml-2",
            size: "sm",
            variant: "link",
          })}
        >
          Get Started
        </Link>
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
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus-visible:ring-0 focus-visible:ring-transparent  mx-2">
        <Avatar className="w-9 h-9">
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback className="uppercase">
            {session.user.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={signOutAction}>
            <button>Signout</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
