import { getServerAuthSession } from "~/server/auth";
import { UploadCoverImage } from "../_components/upload-cover-image";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) throw new Error("Unauthorized");

  return (
    <main className="flex flex-col">
      <div className="w-full">
        <UploadCoverImage />
      </div>
      {session.user.name}{" "}
    </main>
  );
}
