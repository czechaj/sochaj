import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ThemeToggler } from "./ThemeToggler";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="container flex items-center px-8 py-3 dark:text-white md:border-b md:border-muted-foreground">
      <Link href={"/"} className="lg:mr-40">
        <Image
          src={"/images/logo/logo.svg"}
          alt="Sochaj"
          width={70}
          height={70}
        />
      </Link>

      <div className="hidden gap-12 md:flex">
        <Link href={"#"}>Link1</Link>
        <Link href={"#"}>Link2</Link>
        <Link href={"#"}>Link3</Link>
      </div>

      <div className="ml-auto flex items-center gap-5">
        <span className="">
          <ThemeToggler />
        </span>
        {/* mobile section */}
        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="dark rounded-md border border-secondary p-1">
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              {session ? (
                <>
                  <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton />
                  </DropdownMenuItem>
                </>
              ) : (
                <SignInButton />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* mobile section */}

        <div className="ml-auto hidden md:flex">
          {session ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
}
