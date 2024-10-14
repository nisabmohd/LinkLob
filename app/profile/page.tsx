import { getAllPasteForUser } from "@/actions/paste";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  const pastes = await getAllPasteForUser();
  console.log(pastes);

  return <div>page</div>;
}
