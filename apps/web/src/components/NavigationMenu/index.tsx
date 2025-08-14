import React from "react";
import Link from "next/link";
import clsx from "clsx";

import {
  NavigationMenu as ShadCNNavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface MenuItem {
  name: string;
  href: string;
}

interface NavigationMenuProps {
  list: MenuItem[];
  path?: string;
}

const NavigationMenu = ({ list, path = "" }: NavigationMenuProps) => (
  <ShadCNNavigationMenu>
    <NavigationMenuList data-testid="menu" className="gap-2 md:gp-3 lg:gap-5">
      {list?.map(({ name, href }, index) => {
        const isActive = path === href;

        return (
          <NavigationMenuItem key={index} className="pt-3">
            <NavigationMenuLink asChild>
              <Link
                href={href}
                className={clsx("items-center font-bold", isActive && "text-primary")}
              >
                <span className={clsx(isActive && "text-primary")}>{name}</span>
                <span
                  className={`w-2 h-2 rounded-full transition-opacity ${
                    isActive ? "opacity-100 bg-primary" : "opacity-0"
                  }`}
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  </ShadCNNavigationMenu>
);

export default NavigationMenu;
