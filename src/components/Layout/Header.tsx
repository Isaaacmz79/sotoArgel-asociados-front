import { MenuMobile } from "../actionables/MenuMobile";
import { Logo } from "../branding/Logo";
import { LogoAndres } from "../branding/LogoAndres";
import { useState } from "react";
import { MobileNav } from "../sections/MobileNav";
import { DesktopNav } from "../sections/DesktopNav";
import Link from "next/link";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed  z-40 w-full">
      <header
        className="
        bg-white flex justify-between items-center py-3 px-5 
      h-16
      md:h-28 md:py-7 md:px-20 shadow-md
      "
      >
        <Link href="/">
          <Logo />
        </Link>
        <LogoAndres />
        <MenuMobile handleMenu={handleMenu} isOpen={isOpen} />
        <DesktopNav />
      </header>
      {isOpen && <MobileNav handleMenu={handleMenu} />}
    </div>
  );
};
