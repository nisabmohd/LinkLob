import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold mb-4">Not found</h2>
      <Link className={buttonVariants()} href="/">
        Back to homepage
      </Link>
    </div>
  );
}
