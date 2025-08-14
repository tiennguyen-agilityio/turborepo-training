"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

// Constants
import { NAV_BAR } from "@/constants/nav";

// Utils
import { cn } from "@/utils/styles";

// Components
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import UserDropdown from "@/components/UserDropdown";
import HamburgerIcon from "@/components/Icons/HamburgerIcon";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MiniHeader = () => {
  const pathname = usePathname() || "";
  const isActiveSignIn = pathname.startsWith("/sign-in");
  const isActiveSignUp = pathname.startsWith("/sign-up");

  const [open, setOpen] = useState(false);

  const handleToggleSheet = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="flex h-20 md:hidden justify-between items-center">
      <Logo className="w-auto hover:text-white-500 text-md md:text-xl" />
      <Sheet open={open} onOpenChange={handleToggleSheet}>
        <SheetTrigger asChild>
          <HamburgerIcon className="cursor-pointer hover:text-primary hover:opacity-80" />
        </SheetTrigger>
        <SheetContent
          side="top"
          className="min-w-full h-fit md:hidden justify-center items-start p-5 gap-2"
        >
          <SheetTitle />
          <SheetDescription />
          {NAV_BAR?.map(({ name, href }, index) => {
            const isActive = pathname === href;
            return (
              <Link
                key={index}
                href={href}
                onClick={handleCloseSheet}
                className={cn(
                  "w-full items-center font-bold rounded-sm py-2 px-5 text-sm hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/50",
                  isActive && "text-primary bg-accent"
                )}
              >
                <span className={cn(isActive && "text-primary")}>{name}</span>
                <span
                  className={`w-2 h-2 rounded-full transition-opacity ${
                    isActive ? "opacity-100 bg-primary" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}

          <ClerkLoaded>
            <SignedOut>
              <div className="w-full flex flex-col justify-start items-start font-bold text-[13px] gap-2">
                <SignInButton>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCloseSheet}
                    className={cn(
                      "w-full h-fit justify-start focus-visible:ring-0",
                      isActiveSignIn && "text-primary bg-accent"
                    )}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCloseSheet}
                    className={cn(
                      "w-full h-fit justify-start focus-visible:ring-0",
                      isActiveSignUp && "text-primary bg-accent"
                    )}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="w-full">
                <UserDropdown onChange={handleCloseSheet} />
              </div>
            </SignedIn>
          </ClerkLoaded>
          <ThemeToggle onChange={handleCloseSheet} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MiniHeader;
