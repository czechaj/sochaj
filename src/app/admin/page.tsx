import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function AdminPage() {
  const session = await getServerAuthSession();
  console.log("🚀 ~ AdminPage ~ session:", session);

  if (!session || session?.user.role === "USER") {
    return redirect("/");
  }

  return <div> AdminPage </div>;
}
