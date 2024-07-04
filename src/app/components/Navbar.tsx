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
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <nav className="container flex items-center p-8 dark:text-white">
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
            <DropdownMenuTrigger className="border-secondary dark rounded-md border p-1">
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* mobile section */}

        <div className="ml-auto hidden md:flex">
          {session ? (
            <Button size={"sm"} variant={"ghost"} /* onClick={() =>} */>
              Logout
            </Button>
          ) : (
            <Button size={"sm"} variant={"ghost"}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
