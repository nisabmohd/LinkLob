import { createNewPaste } from "@/actions/paste";

export default async function NewPastePage() {
  return (
    <form
      action={async () => {
        "use server";
        await createNewPaste({
          content:
            "# Example Title\nThis is some **example content** with <script>alert('XSS');</script>",
          title: "Test post",
        });
      }}
    >
      <button>create a dummy paste</button>
    </form>
  );
}
