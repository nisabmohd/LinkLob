import { signInAction } from "@/actions/auth";
import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex items-center flex-col h-[85vh] py-8 gap-6 justify-center pt-28">
      <div className="flex items-center flex-col gap-4 text-center">
        <h2 className="text-5xl font-extrabold">LinkLob: Paste your content</h2>
        <p className="text-lg max-w-[700px] font-medium">
          Share code, notes, and text with others. The content you paste here is
          public and accessible via a unique URL.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/new"
          className={buttonVariants({
            className: "w-[200px] font-medium",
            size: "lg",
          })}
        >
          Get Started
        </Link>
        {!session?.user && (
          <form action={signInAction}>
            <Button size="lg" variant="outline" type="submit">
              Signin with Google
            </Button>
          </form>
        )}
      </div>
      <div className="pt-8">
        <Image
          src="/hero1.png"
          alt="hero"
          width={400}
          height={300}
          quality={100}
        />
      </div>
    </div>
  );
}
