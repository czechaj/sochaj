import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { Paragraph } from "./ui/Paragraph";

const SignOutButton = () => {
  return (
    <Link
      href={"/api/auth/signout"}
      className="mx-2 flex w-full items-center justify-between gap-1"
    >
      <Paragraph size={"sm"} weight={"semibold"}>
        Sign Out
      </Paragraph>
      <LogOutIcon className="p-0.5 text-foreground" />
    </Link>
  );
};

export { SignOutButton };
