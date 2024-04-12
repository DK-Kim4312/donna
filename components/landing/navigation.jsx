import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from "next/link";

export default function Navigation() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        {/* <Logo /> */}
        <p className="font-bold text-inherit text-[32px]">Donna AI</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="disabled" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Team
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/upgrade-to-premium">
            Pricing
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/main">
            Get Started
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
