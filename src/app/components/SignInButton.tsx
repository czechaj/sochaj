import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { Paragraph } from "./ui/Paragraph";

const SignInButton = () => {
  return (
    <Link
      href={"/api/auth/signin"}
      className="mx-6 flex items-center justify-between gap-2"
    >
      <Paragraph size={"sm"} weight={"semibold"}>
        Sign In
      </Paragraph>
      <LogInIcon className="p-0.5 text-foreground" />
    </Link>
  );
};

export { SignInButton };
