"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@workspace/ui/components/resizable-navbar";
import { Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavbarComp() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full inset-y-10 my-0">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Logo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              className="cursor-pointer"
              href="/sign-in"
            >
              Login
            </NavbarButton>
            <NavbarButton
              variant="primary"
              className="cursor-pointer"
              href="/sign-up"
            >
              Sign Up
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href={"/"}
      className="flex items-start space-x-2.5 ml-1"
      style={{ cursor: "pointer" }}
    >
      <div className="flex relative rounded-lg p-2 bg-gradient-to-br from-blue-500 to-purple-600">
        <Code2 className="-scale-90 text-white" />
        <span className="bg-gradient-to-r from-pink-500 to-orange-500 absolute inset-0 left-7 -top-1 rounded-full h-[16px] w-[16px] p-1">
          <Sparkles className="w-2 h-2 text-white" />
        </span>
      </div>
      <span className="text-transparent -translate-y-[1px] bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        <h1 className="text-[20px] font-semibold">CodeBooth</h1>
      </span>
    </Link>
  );
};
