import type { NavCategory } from "@/lib/categories";
import { LoginMenu } from "@/components/login";
import { LogoIcon } from "@/icons";
import Link from "next/link";
import React from "react";
import { MainDesktopNavigationMenu } from "./menu";

interface MainDesktopNavigationProps {
  navCategories: NavCategory[];
}

const MainDesktopNavigation = ({ navCategories }: MainDesktopNavigationProps) => {
  return (
    <>
      <nav className="relative hidden h-20 w-full items-center justify-between overflow-hidden py-0 md:flex">
        {/* Logo: ~10% from left edge, responsive with vw */}
        <div className="flex shrink-0 pl-[5vw] md:pl-[6vw] lg:pl-[7vw]">
          <Link href="/" className="flex items-center">
            <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-black">
              <LogoIcon className="h-24 w-64 md:w-72" />
            </div>
          </Link>
        </div>

        {/* Navigation: centered / flexible */}
        <div className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center">
          <div className="flex gap-x-6 py-2">
            <MainDesktopNavigationMenu navCategories={navCategories} />
          </div>
        </div>

        {/* Login / profile */}
        <div className="flex shrink-0 pr-[4vw] md:pr-[6vw] lg:pr-[8vw]">
          <LoginMenu />
        </div>
      </nav>
    </>
  );
};

export default MainDesktopNavigation;
