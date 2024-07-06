import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { Paragraph } from "./ui/Paragraph";

export default async function UserActions() {
  const session = await getServerAuthSession();

  return (
    <div className="border-foreground-muted flex flex-col items-start border-b pb-4">
      <Link href={"/profile"} className="flex w-full items-center gap-2">
        {session?.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? ""}
            width={100}
            height={100}
            className="border-foreground-muted aspect-square w-9 rounded-full border"
          />
        )}

        <div className="flex flex-col items-start">
          <Paragraph size={"sm"}>{session?.user.name}</Paragraph>
          <Paragraph size={"xs"} weight={"light"}>
            {session?.user.email}
          </Paragraph>
        </div>
      </Link>

      {/*  <Button variant={"ghost"}>
        <PencilLineIcon className="w-4" />
      </Button> */}
    </div>
  );
}
